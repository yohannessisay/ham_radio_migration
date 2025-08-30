import {
  getFirestore,
  collection,
  getDocs,
  limit,
  query,
  orderBy,
} from "firebase/firestore";
import FirebaseService from "./firebase.service.js";
import { Op } from "sequelize";
import { UserProfile } from "../models/user.model.js";

class UserService {
  private db = getFirestore(FirebaseService.getInstance());

  async getStructure() {
    try {
      const usersCollection = collection(this.db, "UserProfile");
      const usersQuery = query(usersCollection, limit(1));
      const snapshot = await getDocs(usersQuery);

      if (snapshot.empty) {
        return { success: true, data: [], message: "⚠️ No data found" };
      }

      const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return { success: true, data: users, message: `Fetched ${users.length} data successfully` };
    } catch (error: any) {
      console.error("❌ Error fetching users:", error);
      return { success: false, data: null, message: error?.message || "Failed to fetch data" };
    }
  }

  async getUsers(options: any) {
    const { page = 1, limit = 10, sortBy = "timestamp", sortOrder = "DESC", filters = {} } = options;

    const where: any = {};
    for (const key in filters) {
      if (filters[key]) where[key] = { [Op.iLike]: `%${filters[key]}%` };
    }

    const { count, rows } = await UserProfile.findAndCountAll({
      where,
      limit,
      offset: (page - 1) * limit,
      order: [[sortBy, sortOrder]],
    });

    return { success: true, data: rows, pagination: { total: count, page, limit, totalPages: Math.ceil(count / limit) } };
  }

  async fetchLatestFromFirestore(limitCount = 10000) {
    const usersCollection = collection(this.db, "UserProfile");
    const usersQuery = query(usersCollection, orderBy("timestamp", "desc"), limit(limitCount));
    const snapshot = await getDocs(usersQuery);

    if (snapshot.empty) {
      console.log("⚠️ No users found in Firestore");
      return [];
    }

    const users = snapshot.docs.map((doc) => ({
      uid: (doc.data() as any).uid || doc.id,
      firstName: (doc.data() as any).firstName || null,
      lastName: (doc.data() as any).lastName || null,
      callSign: (doc.data() as any).callSign || null,
      email: (doc.data() as any).email || null,
      phoneNumber: (doc.data() as any).phoneNumber || null,
      country: (doc.data() as any).country || null,
      state: (doc.data() as any).state || null,
      city: (doc.data() as any).city || null,
      address: (doc.data() as any).address || null,
      gridSquare: (doc.data() as any).gridSquare || null,
      bio: (doc.data() as any).bio || null,
      cqZone: (doc.data() as any).cqZone || null,
      ituZone: (doc.data() as any).ituZone || null,
      coordinates: (doc.data() as any).coordinates || null,
      nameSearchIndex: (doc.data() as any).nameSearchIndex || [],
      callsignSearchIndex: (doc.data() as any).callsignSearchIndex || [],
      timestamp: (doc.data() as any).timestamp?.seconds
        ? new Date((doc.data() as any).timestamp.seconds * 1000)
        : typeof (doc.data() as any).timestamp === "number"
        ? new Date((doc.data() as any).timestamp)
        : typeof (doc.data() as any).timestamp === "string"
        ? new Date((doc.data() as any).timestamp)
        : null,
    }));

    return users;
  }

  async insertIntoPostgres(users: any[]) {
    if (!users.length) return 0;

    const inserted = await UserProfile.bulkCreate(users, {
      ignoreDuplicates: true,
      updateOnDuplicate: [
        "firstName",
        "lastName",
        "callSign",
        "email",
        "phoneNumber",
        "country",
        "state",
        "city",
        "address",
        "gridSquare",
        "bio",
        "cqZone",
        "ituZone",
        "coordinates",
        "nameSearchIndex",
        "callsignSearchIndex",
        "timestamp",
      ],
    });
    return inserted.length;
  }

  async syncFromFirestore(limitCount = 10000) {
    const users = await this.fetchLatestFromFirestore(limitCount);
    const insertedCount = await this.insertIntoPostgres(users);
    return { totalFetched: users.length, insertedCount };
  }
}

export default new UserService();
