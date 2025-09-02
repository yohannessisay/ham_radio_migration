import { FastifyRequest, FastifyReply } from "fastify";
import LogBookContactService from "../services/logbook-contact.service.js";
import { sendSuccess, sendError } from "../utils/responseHandler.js";

class LogBookContactController {
  /**
   * GET /logbook-contacts?page=1&limit=10&sortBy=timestamp&sortOrder=DESC&search=W9KV
   */
  async getLogBookContacts(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { page, limit, sortBy, sortOrder, search } = req.query as {
        page?: string;
        limit?: string;
        sortBy?: string;
        sortOrder?: 'ASC' | 'DESC';
        search?: string;
      };

      const result = await LogBookContactService.getLogBookContacts({
        page: Number(page) || 1,
        limit: Number(limit) || 50,
        sortBy: sortBy || 'timestamp',
        sortOrder: sortOrder === 'ASC' ? 'ASC' : 'DESC',
        search: search || '',
      });

      if (!result.success) {
        return sendError({ reply, message: result.message });
      }

      // Prepare pagination info if available
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
        data: result.data, // was result.contacts
        message: 'Logbook contacts fetched successfully',
        pagination: paginationInfo,
      });
    } catch (err) {
      return sendError({ reply, message: 'Failed to fetch logbook contacts', error: err });
    }
  }

  /**
   * GET /logbook-contacts/:id
   */
  async getLogBookContactById(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = req.params as { id: string };

      if (!id) {
        return sendError({ reply, message: 'Contact ID is required', statusCode: 400 });
      }

      const result = await LogBookContactService.getLogBookContactById(id);

      if (!result.success) {
        return sendError({ reply, message: result.message, statusCode: 404 });
      }

      return sendSuccess({
        reply,
        data: result.data, // was result.contact
        message: 'Logbook contact fetched successfully',
      });
    } catch (err) {
      return sendError({ reply, message: 'Failed to fetch logbook contact', error: err });
    }
  }
}

export default new LogBookContactController();