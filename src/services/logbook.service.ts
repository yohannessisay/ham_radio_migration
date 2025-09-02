import { Op } from "sequelize";
import { LogBook } from "../models/logbook.model.js";

class LogBookService {
  /**
   * Fetch paginated, sorted, searchable logbooks
   */
  async getLogBooks(options: {
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

    const allowedSortFields = ['timestamp', 'name', 'callSign', 'uid', 'lastContactTimestamp'];
    const sortColumn = allowedSortFields.includes(sortBy) ? sortBy : 'timestamp';

    const where: any = {};

    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { myCallSign: { [Op.iLike]: `%${search}%` } },
        { defaultCallSign: { [Op.iLike]: `%${search}%` } },
        { uid: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    try {
      const { count, rows: logbooks } = await LogBook.findAndCountAll({
        where,
        limit,
        offset: (page - 1) * limit,
        order: [[sortColumn, order]],
        attributes: {
          exclude: ['firebase_id'] // Hide internal key
        }
      });

      const totalPages = Math.ceil(count / limit);

      return {
        success: true,
        data: logbooks,
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
      console.error('LogBookService.getLogBooks error:', error);
      return {
        success: false,
        data: undefined,
        message: 'Failed to fetch logbooks',
      };
    }
  }

  /**
   * Get a single logbook by ID
   * Assumes `id` is TEXT and part of composite PK — use with `uid` if needed
   */
  async getLogBookById(id: string) {
    if (!id) {
      return { success: false, data: undefined, message: 'LogBook ID is required' };
    }

    try {
      const logbook = await LogBook.findOne({
        where: { id },
        attributes: {
          exclude: ['firebase_id']
        }
      });

      if (!logbook) {
        return { success: false, data: undefined, message: 'LogBook not found' };  
      }

      return {
        success: true,
        data: logbook,
      };
    } catch (error) {
      console.error(`LogBookService.getLogBookById(${id}) error:`, error);
      return {
        success: false,
        data: undefined,
        message: 'Failed to fetch logbook',
      };
    }
  }
}

export default new LogBookService();