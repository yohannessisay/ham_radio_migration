import { FastifyRequest, FastifyReply } from "fastify";
import LogBookService from "../services/logbook.service.js";
import { sendSuccess, sendError } from "../utils/responseHandler.js";

class LogBookController {
  /**
   * GET /logbooks?page=1&limit=10&sortBy=timestamp&sortOrder=DESC&search=AA1RC
   */
  async getLogBooks(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { page, limit, sortBy, sortOrder, search } = req.query as {
        page?: string;
        limit?: string;
        sortBy?: string;
        sortOrder?: "ASC" | "DESC";
        search?: string;
      };

      const result = await LogBookService.getLogBooks({
        page: Number(page) || 1,
        limit: Number(limit) || 50,
        sortBy: sortBy || "timestamp",
        sortOrder: sortOrder === "ASC" ? "ASC" : "DESC",
        search: search || "",
      });

      if (!result.success) {
        return sendError({ reply, message: result.message });
      }
 
      let paginationInfo = undefined;
      if (result.pagination) {
        const currentPage = Number(page) || result.pagination.page || 1;
        const itemsPerPage = Number(limit) || result.pagination.limit || 10;
        const totalItems = Number(result.pagination.total) || 0;
        const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

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
        message: "LogBooks fetched successfully",
        pagination: paginationInfo,
      });
    } catch (err) {
      return sendError({
        reply,
        message: "Failed to fetch logbooks",
        error: err,
      });
    }
  }

  /**
   * GET /logbooks/:id
   */
  async getLogBookById(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = req.params as { id: string };

      if (!id) {
        return sendError({
          reply,
          message: "LogBook ID is required",
          statusCode: 400,
        });
      }

      const result = await LogBookService.getLogBookById(id);

      if (!result.success) {
        return sendError({ reply, message: result.message, statusCode: 404 });
      }

      return sendSuccess({
        reply,
        data: result.data,
        message: "LogBook fetched successfully",
      });
    } catch (err) {
      return sendError({
        reply,
        message: "Failed to fetch logbook",
        error: err,
      });
    }
  }
}

export default new LogBookController();
