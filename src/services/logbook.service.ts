import { Op } from "sequelize";
import { LogBook } from "../models/logbook.model.js";
import { UserProfile } from "../models/user.model.js";

class LogBookService {
  /**
   * Fetch paginated, sorted, searchable logbooks
   */
  async getLogBooks(options: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "ASC" | "DESC";
    search?: string;
    country?: string;
  }) {
    const {
      page = 1,
      limit = 10,
      sortBy = "timestamp",
      sortOrder = "DESC",
      search = "",
      country = "",
    } = options;

    const order = sortOrder === "ASC" ? "ASC" : "DESC";

    const allowedSortFields = [
      "timestamp",
      "name", 
    ];
    const sortColumn = allowedSortFields.includes(sortBy)
      ? sortBy
      : "timestamp";

    const where: any = {};

    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } }
      ];
    }
    if (country) {
      where.country = { [Op.iLike]: `%${country}%` };
    }

    try {
      const { count, rows: logbooks } = await LogBook.findAndCountAll({
        where,
        limit,
        offset: (page - 1) * limit,
        order: [[sortColumn, order]],
        attributes: [
          "name", 
          "timestamp",  
          "id",
        ],
      });

      const totalPages = Math.ceil(count / limit);

      // Return only selected fields; no userProfile on list
      const dataWithUser = logbooks.map((lb: any) => lb.get({ plain: true }));

      return {
        success: true,
        data: dataWithUser,
        pagination: {
          total: count,
          currentPage: page,
          totalPages,
          itemsPerPage: limit,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
          page,
          limit,
          hasNext: page * limit < count,
          hasPrev: page > 1,
        },
      };
    } catch (error) {
      console.error("LogBookService.getLogBooks error:", error);
      return {
        success: false,
        data: undefined,
        message: "Failed to fetch logbooks",
      };
    }
  }

  /**
   * Get all logbooks for a userId (uid) with full data and userProfile
   */
  async getLogBooksByUserId(
    userId: string,
    options: {
      page?: number;
      limit?: number;
      sortBy?: string;
      sortOrder?: "ASC" | "DESC";
    }
  ) {
    const {
      page = 1,
      limit = 10,
      sortBy = "timestamp",
      sortOrder = "DESC",
    } = options;
    const safeLimit = Math.min(Math.max(Number(limit) || 10, 1), 100);
    const order = sortOrder === "ASC" ? "ASC" : "DESC";
    const allowedSortFields = [
      "timestamp",
      "name", 
    ];
    const sortColumn = allowedSortFields.includes(sortBy)
      ? sortBy
      : "timestamp";
    try {
     const { count, rows: logbooks } = await LogBook.findAndCountAll({
        where: { uid: userId },
        limit: safeLimit,
        offset: (page - 1) * safeLimit,
        order: [[sortColumn, order]],
        attributes: {
          exclude: ["firebase_id"],
        },
      });

      // Load user profile once
      const users = await UserProfile.findAll({
        where: { uid: userId as any },
        attributes: [
          "uid",
          "callSign",
          "email",
          "firstName",
          "lastName",
          "country",
          "state",
          "city",
          "gridSquare",
          "profilePic",
          "timestamp",
        ],
      });
      const userProfile = users[0]?.get({ plain: true }) ?? null;

      const data = logbooks.map((lb: any) => {
        const plain = lb.get({ plain: true });
        return {
          ...plain,
          userProfile,
        };
      });

       return {
        success: true,
        data,
        pagination: {
          total: count,
          page,
          limit: safeLimit,
          totalPages: Math.ceil(count / safeLimit),
          hasNext: page * safeLimit < count,
          hasPrev: page > 1,
        },
      };
    } catch (error) {
      console.error(
        `LogBookService.getLogBooksByUserId(${userId}) error:`,
        error
      );
      return {
        success: false,
        data: undefined,
        message: "Failed to fetch logbooks by user",
      };
    }
  }
}

export default new LogBookService();
