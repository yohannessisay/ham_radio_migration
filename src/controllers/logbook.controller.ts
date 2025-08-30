import { FastifyRequest, FastifyReply } from "fastify";
import logbookService from "../services/logbook.service";
 

class LogBookController {
  async syncLogs(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { limit } = req.query as { limit?: string };
      const parsedLimit = limit ? parseInt(limit, 10) : 10000;

      const result = await logbookService.syncFromFirestore(parsedLimit);

      return reply.send({
        success: true,
        message: `✅ Synced ${result.insertedCount} of ${result.totalFetched} Firestore logs`,
      });
    } catch (error: any) {
      return reply
        .status(500)
        .send({ success: false, message: error.message });
    }
  }
}

export default new LogBookController();
