import { FastifyRequest, FastifyReply } from "fastify";
import UserService from "../services/users.service.js";
import { sendSuccess, sendError } from "../utils/responseHandler.js";

class UserController {
  async getStructure(req: FastifyRequest, reply: FastifyReply) {
    const result = await UserService.getStructure();

    if (result.success) {
      return sendSuccess({
        reply,
        data: { count: result.data?.length, user: result.data },
        message: result.message,
      });
    } else {
      return sendError({
        reply,
        message: result.message,
      });
    }
  }

  async getUsers(req: FastifyRequest, reply: FastifyReply) {
    try {
      // Extract query params
      const { page, limit, sortBy, sortOrder, ...filters } = req.query as any;

      const result = await UserService.getUsers({
        page: Number(page) || 1,
        limit: Number(limit) || 50,
        sortBy: sortBy || "timestamp",
        sortOrder: sortOrder?.toUpperCase() === "ASC" ? "ASC" : "DESC",
        filters,
      });

      return sendSuccess({ reply, data: result, message: "Users fetched successfully" });
    } catch (err) {
      return sendError({ reply, error: err, message: "Failed to fetch users" });
    }
  }

    async syncUsers(req: FastifyRequest, reply: FastifyReply) {
    try {
      const result = await UserService.syncFromFirestore(10000);
      return reply.send({
        success: true,
        message: `Fetched ${result.totalFetched} users and inserted ${result.insertedCount} into Postgres`,
      });
    } catch (err: any) {
      console.error("❌ Sync error:", err);
      return reply.status(500).send({
        success: false,
        message: err.message || "Failed to sync users",
      });
    }
  }
}

export default new UserController();
