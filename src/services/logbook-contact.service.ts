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
        attributes: {
          exclude: ["firebase_id"], // Hide internal key
        },
      });

      const totalPages = Math.ceil(count / limit);

      // Batch load user profiles to avoid N+1
      const uids = Array.from(
        new Set(
          contacts
            .map((c: any) => c?.uid)
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

      const dataWithUser = contacts.map((c: any) => {
        const plain = c.get({ plain: true });
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
      console.error("LogBookContactService.getLogBookContacts error:", error);
      return {
        success: false,
        data: undefined,
        message: "Failed to fetch logbook contacts",
      };
    }
  }

  /**
   * Get a single logbook contact by ID
   */
  async getLogBookContactById(id: string) {
    if (!id) {
      return {
        success: false,
        data: undefined,
        message: "Contact ID is required",
      };
    }

    try {
      const contact = await LogbookContacts.findOne({
        where: { id },
        attributes: {
          exclude: ["firebase_id"],
        },
      });

      if (!contact) {
        return {
          success: false,
          data: undefined,
          message: "Logbook contact not found",
        };
      }

      // Load related user profile (single extra query)
      let userProfile: any = null;
      const contactPlain = contact.get({ plain: true }) as any;
      if (contactPlain?.uid) {
        const user = await UserProfile.findOne({
          where: { uid: contactPlain.uid },
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
          ...contactPlain,
          userProfile,
        },
      };
    } catch (error) {
      console.error(
        `LogBookContactService.getLogBookContactById(${id}) error:`,
        error
      );
      return {
        success: false,
        data: undefined,
        message: "Failed to fetch logbook contact",
      };
    }
  }
}

export default new LogBookContactService();
