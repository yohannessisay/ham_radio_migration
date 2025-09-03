import { Op } from "sequelize";
import { UserProfile } from "../models/user.model.js";

class UserService {
  /**
   * Fetch paginated, sorted, and searchable users from PostgreSQL
   */
  async getUsers(options: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
    search?: string;
    country?: string;
  }) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'timestamp',
      sortOrder = 'DESC',
      search = '',
      country = '',
    } = options;
 
    const order = sortOrder === 'ASC' ? 'ASC' : 'DESC';

    // Supported sort fields (prevent SQL injection)
    const allowedSortFields = [
      'timestamp',
      'firstName',
      'lastName',
      'callSign',
      'email',   
    ];
    const sortColumn = allowedSortFields.includes(sortBy) ? sortBy : 'timestamp';
 
    const where: any = {};
    if (search) {
      where[Op.or] = [
        { firstName: { [Op.iLike]: `%${search}%` } },
        { lastName: { [Op.iLike]: `%${search}%` } },
        { callSign: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
        { country: { [Op.iLike]: `%${search}%` } },
        { state: { [Op.iLike]: `%${search}%` } },
        { city: { [Op.iLike]: `%${search}%` } },
      ];
    }
    if (country) {
      where[Op.and] = [
        { country: { [Op.iLike]: `%${country}%` } },
      ];
    }

    try {
      const { count, rows: users } = await UserProfile.findAndCountAll({
        where,
        limit,
        offset: (page - 1) * limit,
        order: [[sortColumn, order]],
        attributes: [
          "profilePic",
          "callSign",
          "firstName",
          "lastName",
          "email",
          "city",
          "state",
          "country",
          "membershipStatus",
          "timestamp",
        ],
      });

      return {
        success: true,
        data: users,
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
      console.error('UserService.getUsers error:', error);
      return {
        success: false,
        data: null,
        message: 'Failed to fetch users',
      };
    }
  }

  /**
   * Fetch a single user by ID (uses `uid` as the ID field)
   */
  async getUserById(uid: string) {
    if (!uid) {
      return { success: false, data: null, message: 'User ID is required' };
    }

    try {
      const user = await UserProfile.findOne({
        where: { uid },  
        attributes: {
          exclude: ['firebase_id'] // hide internal key
        }
      });

      if (!user) {
        return { success: false, data: null, message: 'User not found' };
      }

      return {
        success: true,
        data: user,
      };
    } catch (error) {
      console.error(`UserService.getUserById(${uid}) error:`, error);
      return {
        success: false,
        data: null,
        message: 'Failed to fetch user',
      };
    }
  }
}

export default new UserService();