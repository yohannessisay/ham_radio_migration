// controllers/sync.controller.ts
import { FastifyRequest, FastifyReply } from "fastify";
import syncService from "../services/sync.service";

class SyncController {
  async syncAll(req: FastifyRequest, reply: FastifyReply) {
    try { 

      const result = await syncService.syncAll();
      

      return reply.send({
        success: true,
        message: "✅ Firestore synced successfully",
        data: result,
      });
    } catch (error: any) {
      return reply.status(500).send({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new SyncController();
