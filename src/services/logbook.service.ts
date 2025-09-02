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
      "callSign",
      "uid",
      "lastContactTimestamp",
    ];
    const sortColumn = allowedSortFields.includes(sortBy)
      ? sortBy
      : "timestamp";

    const where: any = {};

    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { myCallSign: { [Op.iLike]: `%${search}%` } },
        { defaultCallSign: { [Op.iLike]: `%${search}%` } },  
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
        attributes: {
          exclude: ["firebase_id"], // Hide internal key
        },
      });

      const totalPages = Math.ceil(count / limit);

      // Batch load user profiles to avoid N+1
      const uids = Array.from(
        new Set(
          logbooks
            .map((lb: any) => lb?.uid)
            .filter((uid: string | null | undefined) => !!uid)
        )
      );

      let usersByUid = new Map<string, any>();
      if (uids.length > 0) {
        const users = await UserProfile.findAll({
          where: { uid: { [Op.in]: uids } as any },
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
        usersByUid = new Map(
          users.map((u: any) => [u.uid, u.get({ plain: true })])
        );
      }

      const dataWithUser = logbooks.map((lb: any) => {
        const plain = lb.get({ plain: true });
        return {
          ...plain,
          userProfile: usersByUid.get(plain.uid) ?? null,
        };
      });

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
   * Get a single logbook by ID
   * Assumes `id` is TEXT and part of composite PK — use with `uid` if needed
   */
  async getLogBookById(id: string) {
    if (!id) {
      return {
        success: false,
        data: undefined,
        message: "LogBook ID is required",
      };
    }

    try {
      const logbook = await LogBook.findOne({
        where: { id },
        attributes: {
          exclude: ["firebase_id"],
        },
      });

      if (!logbook) {
        return {
          success: false,
          data: undefined,
          message: "LogBook not found",
        };
      }

      // Load related user profile (single extra query)
      let userProfile: any = null;
      const lbPlain = logbook.get({ plain: true }) as any;
      if (lbPlain?.uid) {
        const user = await UserProfile.findOne({
          where: { uid: lbPlain.uid },
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
        userProfile = user ? user.get({ plain: true }) : null;
      }

      return {
        success: true,
        data: {
          ...lbPlain,
          userProfile,
        },
      };
    } catch (error) {
      console.error(`LogBookService.getLogBookById(${id}) error:`, error);
      return {
        success: false,
        data: undefined,
        message: "Failed to fetch logbook",
      };
    }
  }
}

export default new LogBookService();
