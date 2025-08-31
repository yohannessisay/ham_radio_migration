// services/collection-structure.service.ts
import {
  getFirestore,
  collection,
  getDocs,
  limit,
  query,
  orderBy,
} from "firebase/firestore";
import FirebaseService from "./firebase.service.js";

// Define PostgreSQL-compatible type
interface PgColumn {
  fieldName: string;           // Original camelCase field name
  columnName: string;          // snake_case column name
  dataType: string;            // PostgreSQL type (TEXT, INTEGER, JSONB, etc.)
  notNull?: boolean;           // Can be inferred if always present
  isPrimaryKey?: boolean;      // Optional hint
}

interface CollectionStructure {
  collection: string;
  sampleSize: number;
  columns: PgColumn[];
  warnings: string[];
}

class CollectionStructureService {
  private db = getFirestore(FirebaseService.getInstance());

  /**
   * Get inferred PostgreSQL schema from a Firestore collection
   */
  async getCollectionStructure(
    collectionName: string,
    sampleSize = 10
  ): Promise<CollectionStructure> {
    const docs = await this.fetchRandomSamples(collectionName, sampleSize);
    if (!docs.length) {
      return {
        collection: collectionName,
        sampleSize: 0,
        columns: [],
        warnings: ["No documents found in the collection."],
      };
    }

    const schema = this.inferSchemaFromDocs(docs);
    const warnings = this.validateSchema(schema, docs);

    return {
      collection: collectionName,
      sampleSize: docs.length,
      columns: schema,
      warnings,
    };
  }

  /**
   * Fetch up to `sampleSize` documents (ordered by timestamp or random fallback)
   */
  private async fetchRandomSamples(collectionName: string, sampleSize: number) {
    const collRef = collection(this.db, collectionName);
    let snapshot;

    try {
      // Try to order by timestamp for consistency
      const q = query(collRef, orderBy("timestamp", "desc"), limit(sampleSize));
      snapshot = await getDocs(q);
    } catch (err: any) {
      // If timestamp doesn't exist, fall back to unordered (effectively random)
      console.warn(`No 'timestamp' field in '${collectionName}', fetching unordered docs.`);
      const q = query(collRef, limit(sampleSize));
      snapshot = await getDocs(q);
    }

    if (snapshot.empty) return [];

    return snapshot.docs.map((doc) => ({
      firebase_id: doc.id,
      ...doc.data(),
    }));
  }

  /**
   * Infer schema from array of documents
   */
  private inferSchemaFromDocs(docs: any[]): PgColumn[] {
    const merged: { [key: string]: string } = {};
    const presence: { [key: string]: number } = {}; // Count how many times field appears

    docs.forEach((doc) => {
      Object.keys(doc).forEach((key) => {
        presence[key] = (presence[key] || 0) + 1;
        const inferred = this.inferPostgresType(doc[key]);
        if (!merged[key]) {
          merged[key] = inferred;
        } else {
          merged[key] = this.mergeTypes(merged[key], inferred);
        }
      });
    });

    // Sort by frequency (most common first), then alphabetically
    const sortedKeys = Object.keys(merged).sort((a, b) => {
      const diff = presence[b] - presence[a];
      return diff !== 0 ? diff : a.localeCompare(b);
    });

    return sortedKeys.map((fieldName) => ({
      fieldName,
      columnName: this.toSnakeCase(fieldName),
      dataType: merged[fieldName],
      notNull: presence[fieldName] === docs.length, // appears in all docs
      isPrimaryKey: fieldName === "uid" || fieldName === "id" || fieldName === "firebase_id",
    }));
  }

  /**
   * Basic type inference to PostgreSQL/Sequelize-friendly types
   */
  private inferPostgresType(value: any): string {
    if (value === null || value === undefined) {
      return "TEXT"; // default placeholder
    }

    const type = typeof value;

    if (type === "string") {
      if (value.match(/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}/) || 
          value.match(/^\d{4}-\d{2}-\d{2}$/) ||
          !isNaN(Date.parse(value))) return "TIMESTAMP";
      return "TEXT";
    }

    if (type === "number") {
      if (Number.isInteger(value)) {
        if (value >= -32768 && value <= 32767) return "SMALLINT";
        if (value <= 2147483647) return "INTEGER";
        return "BIGINT";
      }
      return "DOUBLE PRECISION";
    }

    if (type === "boolean") {
      return "BOOLEAN";
    }

    if (value instanceof Date) {
      return "TIMESTAMP";
    }

    // Firestore Timestamp
    if (
      type === "object" &&
      value.hasOwnProperty("seconds") &&
      typeof value.seconds === "number"
    ) {
      return "TIMESTAMP";
    }

    if (Array.isArray(value)) {
      if (value.length === 0) return "TEXT[]";
      const firstType = this.inferPostgresType(value[0]);
      if (firstType === "TEXT" || firstType === "TIMESTAMP" || firstType === "BOOLEAN") {
        return "TEXT[]";
      }
      if (firstType === "INTEGER" || firstType === "SMALLINT") {
        return "INTEGER[]";
      }
      if (firstType === "DOUBLE PRECISION") {
        return "DOUBLE PRECISION[]";
      }
      return "JSONB"; // fallback for mixed arrays
    }

    if (type === "object") {
      return "JSONB"; // default for complex objects
    }

    return "TEXT";
  }

  /**
   * Merge two types into the most compatible supertype
   */
  private mergeTypes(t1: string, t2: string): string {
    if (t1 === t2) return t1;

    // If either is JSONB, result is JSONB
    if (t1 === "JSONB" || t2 === "JSONB") return "JSONB";

    // Timestamp vs Text
    if ((t1 === "TIMESTAMP" && t2 === "TEXT") || (t2 === "TIMESTAMP" && t1 === "TEXT")) {
      return "TEXT"; // safe fallback
    }

    // Array vs Scalar
    if (t1.endsWith("]") && !t2.endsWith("]")) return "JSONB";
    if (t2.endsWith("]") && !t1.endsWith("]")) return "JSONB";

    // Different array types
    if (t1.endsWith("]") && t2.endsWith("]")) {
      const base1 = t1.split("[")[0];
      const base2 = t2.split("[")[0];
      if (base1 === base2) return t1;
      return "JSONB";
    }

    // Default fallback
    return "TEXT";
  }

  /**
   * Validate schema and collect warnings
   */
  private validateSchema(columns: PgColumn[], docs: any[]): string[] {
    const warnings: string[] = [];

    const hasUid = columns.some((c) => c.isPrimaryKey);
    if (!hasUid) {
      warnings.push("No obvious primary key (uid/id) found. Consider adding one.");
    }

    const highNullFields = columns.filter((c) => !c.notNull && c.fieldName !== "firebase_id");
    if (highNullFields.length > 3) {
      warnings.push(`Found ${highNullFields.length} fields that are not always present.`);
    }

    return warnings;
  }

  /**
   * Convert camelCase to snake_case
   */
  private toSnakeCase(str: string): string {
    return str
      .replace(/([A-Z])/g, "_$1")
      .toLowerCase()
      .replace(/^_/, "");
  }
}

export default new CollectionStructureService();