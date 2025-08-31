import { Op } from "sequelize";
import { LogbookContacts } from "../models/logbook_contacts.model.js";

class LogBookContactService {
  /**
   * Fetch paginated, sorted, searchable logbook contacts
   */
  async getLogBookContacts(options: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
    search?: string;
  }) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'timestamp',
      sortOrder = 'DESC',
      search = '',
    } = options;

    const order = sortOrder === 'ASC' ? 'ASC' : 'DESC';

    const allowedSortFields = [
      'timestamp',
      'contact_time_stamp',
      'their_callsign',
      'my_call_sign',
      'band',
      'frequency',
      'country',
      'state',
      'uid',
    ];
    const sortColumn = allowedSortFields.includes(sortBy) ? sortBy : 'timestamp';

    const where: any = {};

    if (search) {
      where[Op.or] = [
        { their_callsign: { [Op.iLike]: `%${search}%` } },
        { my_call_sign: { [Op.iLike]: `%${search}%` } },
        { band: { [Op.iLike]: `%${search}%` } },
        { frequency: { [Op.iLike]: `%${search}%` } },
        { country: { [Op.iLike]: `%${search}%` } },
        { state: { [Op.iLike]: `%${search}%` } },
        { uid: { [Op.iLike]: `%${search}%` } },
        { contest_id: { [Op.iLike]: `%${search}%` } },
      ];
    }

    try {
      const { count, rows: contacts } = await LogbookContacts.findAndCountAll({
        where,
        limit,
        offset: (page - 1) * limit,
        order: [[sortColumn, order]],
        attributes: {
          exclude: ['firebase_id'] // Hide internal key
        }
      });

      return {
        success: true,
         contacts,
        pagination: {
          total: count,
          page,
          limit,
          totalPages: Math.ceil(count / limit),
          hasNext: page * limit < count,
          hasPrev: page > 1,
        },
      };
    } catch (error) {
      console.error('LogBookContactService.getLogBookContacts error:', error);
      return {
        success: false,
         undefined, 
        message: 'Failed to fetch logbook contacts',
      };
    }
  }

  /**
   * Get a single logbook contact by ID
   */
  async getLogBookContactById(id: string) {
    if (!id) {
      return { success: false,  undefined, message: 'Contact ID is required' };
    }

    try {
      const contact = await LogbookContacts.findOne({
        where: { id },
        attributes: {
          exclude: ['firebase_id']
        }
      });

      if (!contact) {
        return { success: false,  undefined, message: 'Logbook contact not found' };
      }

      return {
        success: true,
         contact,
      };
    } catch (error) {
      console.error(`LogBookContactService.getLogBookContactById(${id}) error:`, error);
      return {
        success: false,
         undefined,
        message: 'Failed to fetch logbook contact',
      };
    }
  }
}

export default new LogBookContactService();