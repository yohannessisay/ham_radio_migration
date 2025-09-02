import { Op } from "sequelize";
import { LogbookContacts } from "../models/logbook_contacts.model.js";
import { UserProfile } from "../models/user.model.js";

class LogBookContactService {
  /**
   * Fetch paginated, sorted, searchable logbook contacts
   */
  async getLogBookContacts(options: {
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
      "contact_time_stamp",
      "their_callsign",
      "my_call_sign",
      "band",
      "frequency",
      "country",
      "state",
      "uid",
    ];
    const sortColumn = allowedSortFields.includes(sortBy)
      ? sortBy
      : "timestamp";

    const where: any = {};

    if (search) {
      where[Op.or] = [
        { their_callsign: { [Op.iLike]: `%${search}%` } },
        { my_call_sign: { [Op.iLike]: `%${search}%` } },
        { my_name: { [Op.iLike]: `%${search}%` } },
        { their_name: { [Op.iLike]: `%${search}%` } },
      ];
    }
    if (country) {
      where.country = { [Op.iLike]: `%${country}%` };
    }

    try {
      const { count, rows: contacts } = await LogbookContacts.findAndCountAll({
        where,
        limit,
        offset: (page - 1) * limit,
        order: [[sortColumn, order]],
        attributes: [
          "their_callsign",
          "their_name",
          "their_country",
          "frequency",
          "user_mode",
          "timestamp",
        ],
      });

      const totalPages = Math.ceil(count / limit);

      const data = contacts.map((c: any) => c.get({ plain: true }));

      return {
        success: true,
        data,
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
      console.error("LogBookContactService.getLogBookContacts error:", error);
      return {
        success: false,
        data: undefined,
        message: "Failed to fetch logbook contacts",
      };
    }
  }

  /**
   * Get all logbook contacts for a userId (uid) with full data and userProfile
   */
  async getLogBookContactsByUserId(options: {
    userId: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "ASC" | "DESC";
  }) {
    const {
      userId,
      page = 1,
      limit = 10,
      sortBy = "timestamp",
      sortOrder = "DESC",
    } = options;

 
    const safeLimit = Math.min(Math.max(Number(limit) || 10, 1), 100);
    const order = sortOrder === "ASC" ? "ASC" : "DESC";
    const allowedSortFields = [
      "timestamp",
      "contact_time_stamp",
      "their_callsign",
      "my_call_sign",
      "band",
      "frequency",
      "country",
      "state",
      "uid",
    ];
    const sortColumn = allowedSortFields.includes(sortBy) ? sortBy : "timestamp";

    try {
      const { count, rows: contacts } = await LogbookContacts.findAndCountAll({
        where: { uid: userId },
        limit: safeLimit,
        offset: (page - 1) * safeLimit,
        order: [[sortColumn, order]],
        attributes: {
          exclude: ["firebase_id"],
        },
      });

      // Load the related user profile once
      const user = await UserProfile.findOne({
        where: { uid: userId },
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
      const userProfile = user ? user.get({ plain: true }) : null;

      const data = contacts.map((c: any) => {
        const plain = c.get({ plain: true });
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
        `LogBookContactService.getLogBookContactsByUserId(${userId}) error:`,
        error
      );
      return {
        success: false,
        data: undefined,
        message: "Failed to fetch logbook contacts by user",
      };
    }
  }
}

export default new LogBookContactService();
