import { FastifyRequest, FastifyReply } from "fastify"; 
import { sendSuccess, sendError } from "../utils/responseHandler.js";
import usersService from "../services/users.service.js";

class UserController {
  /**
   * GET /users?page=1&limit=10&sortBy=timestamp&sortOrder=DESC&search=name
   */
  async getUsers(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { page, limit, sortBy, sortOrder, search,country} = req.query as {
        page?: string;
        limit?: string;
        sortBy?: string;
        sortOrder?: 'ASC' | 'DESC';
        search?: string; 
        country?: string;
      };

      const result = await usersService.getUsers({
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        sortBy: sortBy || "timestamp",
        sortOrder: sortOrder === 'ASC' ? 'ASC' : 'DESC',
        search: search || '', 
        country: country || '',
      });

      if (!result.success) {
        return sendError({ reply, message: result.message });
      }

      // Prepare pagination info if available
      let paginationInfo = undefined;
      if (result.pagination) {
        const currentPage = Number(page) || 1;
        const itemsPerPage = Number(limit) || 10;
        const totalItems = result.pagination.total || 0;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        
        paginationInfo = {
          currentPage,
          totalPages,
          totalItems,
          itemsPerPage,
          hasNextPage: currentPage < totalPages,
          hasPreviousPage: currentPage > 1,
        };
      }

      return sendSuccess({
        reply,
        data: result.data,
        message: result.message || "Users fetched successfully",
        pagination: paginationInfo,
      });
    } catch (err) {
      return sendError({ reply, message: "Failed to fetch users", error: err });
    }
  }

  /**
   * GET /users/:id
   */
  async getUserById(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = req.params as { id: string };

      if (!id) {
        return sendError({ reply, message: "User ID is required", statusCode: 400 });
      }

      const result = await usersService.getUserById(id);

      if (!result.success) {
        return sendError({ reply, message: result.message, statusCode: 404 });
      }

      return sendSuccess({
        reply,
        data: result.data,
        message: "User fetched successfully",
      });
    } catch (err) {
      return sendError({ reply, message: "Failed to fetch user", error: err });
    }
  }
}

export default new UserController();