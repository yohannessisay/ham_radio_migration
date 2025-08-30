import {
  getFirestore,
  collection,
  getDocs,
  limit,
  query,
  orderBy,
} from "firebase/firestore";
import FirebaseService from "./firebase.service.js";
import { GetUsersOptions, ServiceResult, User } from "../types/user.type.js";
import { Op } from "sequelize";
import { UserProfile } from "../models/user.model.js";

class UserService {
  private db = getFirestore(FirebaseService.getInstance());

  async getStructure(): Promise<ServiceResult<User[]>> {
    try {
      const usersCollection = collection(this.db, "LogBook");
      const usersQuery = query(usersCollection, limit(1));
      const snapshot = await getDocs(usersQuery);

      if (snapshot.empty) {
        return {
          success: true,
          data: [],
          message: "⚠️ No data found",
        };
      }

      const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      return {
        success: true,
        data: users,
        message: `Fetched ${users.length} data successfully`,
      };
    } catch (error: any) {
      console.error("❌ Error fetching users:", error);
      return {
        success: false,
        data: null,
        message: error?.message || "Failed to fetch data",
      };
    }
  }

  async getUsers(options: GetUsersOptions) {
    const {
      page = 1,
      limit = 10,
      sortBy = "timestamp",
      sortOrder = "DESC",
      filters = {},
    } = options;

    // Build where clause for filtering
    const where: any = {};
    for (const key in filters) {
      if (filters[key]) {
        where[key] = { [Op.iLike]: `%${filters[key]}%` }; // case-insensitive match
      }
    }

    // Query database
    const { count, rows } = await UserProfile.findAndCountAll({
      where,
      limit,
      offset: (page - 1) * limit,
      order: [[sortBy, sortOrder]],
    });

    return {
      success: true,
      data: rows,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  async fetchLatestFromFirestore(limitCount = 10) {
    const usersCollection = collection(this.db, "UserProfile");
    const usersQuery = query(
      usersCollection,
      orderBy("timestamp", "desc"),
      limit(limitCount)
    );
    const snapshot = await getDocs(usersQuery);

    if (snapshot.empty) {
      console.log("⚠️ No users found in Firestore");
      return [];
    }

    const users = snapshot.docs.map((doc) => ({
      firebase_id: doc.id,
      firstName: doc.data().firstName || null,
      lastName: doc.data().lastName || null,
      callSign: doc.data().callSign || null,
      email: doc.data().email || null,
      phoneNumber: doc.data().phoneNumber || null,
      country: doc.data().country || null,
      state: doc.data().state || null,
      city: doc.data().city || null,
      address: doc.data().address || null,
      gridSquare: doc.data().gridSquare || null,
      bio: doc.data().bio || null,
      cqZone: doc.data().cqZone || null,
      ituZone: doc.data().ituZone || null,
      coordinates: doc.data().coordinates || null,
      nameSearchIndex: doc.data().nameSearchIndex || [],
      callsignSearchIndex: doc.data().callsignSearchIndex || [],
      timestamp: doc.data().timestamp?.seconds
        ? new Date(doc.data().timestamp.seconds * 1000)
        : null,
    }));

    return users;
  }

  // Insert users into Postgres
  async insertIntoPostgres(users: any[]) {
    if (!users.length) return 0;

    const inserted = await UserProfile.bulkCreate(users, {
      ignoreDuplicates: true,
    });
    return inserted.length;
  }

  // Full sync method
  async syncFromFirestore(limitCount = 10000) {
    const users = await this.fetchLatestFromFirestore(limitCount);
    const insertedCount = await this.insertIntoPostgres(users);
    return { totalFetched: users.length, insertedCount };
  }
}

export default new UserService();
