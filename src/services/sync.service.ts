// services/sync.service.ts
import {
  getFirestore,
  collection,
  getDocs,
  limit,
  query,
  orderBy,
  startAfter,
} from "firebase/firestore";
import FirebaseService from "./firebase.service.js";
import { UserProfile } from "../models/user.model.js";
import { LogBook } from "../models/logbook.model.js";
import { LogbookContacts } from "../models/logbook_contacts.model.js";

// Tune based on memory and DB performance
const PAGE_SIZE = 5000; // Larger page size for fewer round-trips
const MAX_CONCURRENT_COLLECTIONS = 3; // We only have 3

class SyncService {
  private db = getFirestore(FirebaseService.getInstance());

  // Convert any timestamp format (Firestore Timestamp, number, string) to Date | null
  private toDate(value: any): Date | null {
    if (!value) return null;
    if (typeof value === "object" && "seconds" in value) {
      return new Date(value.seconds * 1000);
    }
    if (typeof value === "number") {
      return new Date(value);
    }
    if (typeof value === "string") {
      const d = new Date(value);
      return isNaN(d.getTime()) ? null : d;
    }
    return null;
  }

  private toJSON(value: any): any {
    return value === undefined || value === null
      ? null
      : JSON.parse(JSON.stringify(value));
  }

  private toStringArray(value: any): string[] {
    if (!Array.isArray(value)) return [];
    return value.filter((v) => v != null && v !== "").map(String);
  }

  private toNumber(val: any, fallback: number | null = null): number | null {
    if (typeof val === "number" && !isNaN(val)) return val;
    const n = Number(val);
    return isNaN(n) ? fallback : n;
  }

  private toBoolean(val: any): boolean | null {
    if (typeof val === "boolean") return val;
    if (typeof val === "string") {
      return ["true", "1", "yes"].includes(val.trim().toLowerCase());
    }
    return null;
  }

  // 🔥 Bulk Sync with Pagination and Sequelize bulkCreate + updateOnDuplicate
  private async syncCollection<T>(
    collectionName: string,
    model: any,
    mapper: (data: any, docId: string) => T,
    orderByField = "timestamp",
    limitCount = 100000
  ): Promise<{ fetchedTotal: number; insertedTotal: number }> {
    const collRef = collection(this.db, collectionName);
    let fetchedTotal = 0;
    let insertedTotal = 0;
    let lastDoc: any = null;

    while (fetchedTotal < limitCount) {
      const remaining = limitCount - fetchedTotal;
      const currentLimit = Math.min(PAGE_SIZE, remaining);

      let q = query(
        collRef,
        orderBy(orderByField, "desc"),
        limit(currentLimit)
      );
      if (lastDoc) {
        q = query(
          collRef,
          orderBy(orderByField, "desc"),
          startAfter(lastDoc),
          limit(currentLimit)
        );
      }

      const snapshot = await getDocs(q);
      if (snapshot.empty) break;

      const records = snapshot.docs.map((doc) => mapper(doc.data(), doc.id));

      fetchedTotal += records.length;
      insertedTotal += records.length; // We assume bulkCreate succeeds

      // 🔥 Use Sequelize bulkCreate with upsert
      try {
        await model.bulkCreate(records, {
          updateOnDuplicate: Object.keys(model.rawAttributes), // Update all fields on conflict
          validate: false,
          ignoreDuplicates: false, // Important: false = update on duplicate key
        });
      } catch (err) {
        console.error(`Bulk insert failed for ${collectionName}:`, err);
        // Optionally, fall back to individual upserts or retry
        insertedTotal -= records.length;
        for (const record of records) {
          try {
            await model.upsert(record, { validate: false });
            insertedTotal++;
          } catch (e) {
            // Ignore individual failure
          }
        }
      }

      lastDoc = snapshot.docs[snapshot.docs.length - 1];
      if (snapshot.docs.length < currentLimit) break;
    }

    return { fetchedTotal, insertedTotal };
  }

  // Mapper Functions
  private mapUserProfile(data: any, docId: string) {
    return {
      uid: data.uid || docId,
      firstName: data.firstName || null,
      lastName: data.lastName || null,
      callSign: data.callSign || null,
      email: data.email || null,
      phoneNumber: data.phoneNumber || null,
      country: data.country || null,
      state: data.state || null,
      city: data.city || null,
      address: data.address || null,
      gridSquare: data.gridSquare || null,
      bio: data.bio || null,
      cqZone: this.toNumber(data.cqZone),
      ituZone: this.toNumber(data.ituZone),
      coordinates: this.toJSON(data.coordinates),
      nameSearchIndex: this.toStringArray(data.nameSearchIndex),
      callsignSearchIndex: this.toStringArray(data.callsignSearchIndex),
      timestamp: this.toDate(data.timestamp),
    };
  }

  private mapLogBook(data: any, docId: string) {
    return {
      uid: data.uid || data.userId || null,
      name: data.name || null,
      myAntenna: data.myAntenna || null,
      myRadio: data.myRadio || null,
      contactCount: this.toNumber(data.contactCount, 0),
      coordinates: this.toJSON(data.coordinates),
      timestamp: this.toDate(data.timestamp),
      lastContactTimestamp: this.toDate(data.lastContactTimestamp),
    };
  }

  private mapLogbookContact(data: any, docId: string) {
    const contactTs = data.contactTimeStamp || data.contactTimestamp;
    return {
      uid: data.uid || data.userId || null,
      logBookId: data.logBookId || null,
      theirCallsign: data.theirCallsign || null,
      profileCallSign: data.profileCallSign || null,
      myName: data.myName || null,
      myCallSign: data.myCallSign || null,
      userMode: data.userMode || null,
      band: data.band || null,
      country: data.country || null,
      myCountry: data.myCountry || null,
      myCity: data.myCity || null,
      myState: data.myState || null,
      userQth: data.userQth || null,
      flagCode: data.flagCode || null,
      userGrid: data.userGrid || null,
      myAntenna: data.myAntenna || null,
      myRadio: data.myRadio || null,
      callSignSearchIndex: this.toStringArray(data.callSignSearchIndex),
      continent: data.continent || null,
      distance: this.toNumber(data.distance),
      coordinates: this.toJSON(data.myCoordinates || data.coordinates),
      timestamp: this.toDate(contactTs) || this.toDate(data.timestamp),
      contactTimeStamp: this.toDate(contactTs),
      date: this.toDate(data.date),
      notes: data.notes || null,
      active: this.toBoolean(data.active),
      nameSearchIndex: this.toStringArray(data.nameSearchIndex),
      myNameSearchIndex: this.toStringArray(data.myNameSearchIndex),
    };
  }

  // 🚀 Main Sync Function
  async syncAll(limitCount = 100000) {
    console.time("Full Sync");

    try {
      // Run all three in parallel
      // const [usersRes, logsRes, contactsRes] = await Promise.all([
      //   this.syncCollection("UserProfile", UserProfile, this.mapUserProfile.bind(this), "timestamp", limitCount),
      //   this.syncCollection("LogBook", LogBook, this.mapLogBook.bind(this), "timestamp", limitCount),
      //   this.syncCollection("LogBookContact", LogbookContacts, this.mapLogbookContact.bind(this), "timestamp", limitCount),
      // ]);
      const [usersRes] = await Promise.all([
        this.syncCollection(
          "UserProfile",
          UserProfile,
          this.mapUserProfile.bind(this),
          "timestamp",
          limitCount
        ),
      ]);

      console.timeEnd("Full Sync");

      return {
        usersFetched: usersRes.fetchedTotal,
        usersInserted: usersRes.insertedTotal,
        // logsFetched: logsRes.fetchedTotal,
        // logsInserted: logsRes.insertedTotal,
        // contactsFetched: contactsRes.fetchedTotal,
        // contactsInserted: contactsRes.insertedTotal,
      };
    } catch (err) {
      console.error("Sync failed:", err);
      throw err;
    }
  }
}

export default new SyncService();
