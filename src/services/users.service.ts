import { getFirestore, collection, getDocs, limit, query } from "firebase/firestore";
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
    const { page = 1, limit = 10, sortBy = "timestamp", sortOrder = "DESC", filters = {} } = options;

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
}

export default new UserService();
