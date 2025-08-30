import { FastifyInstance } from "fastify"; 
import logbookController from "../controllers/logbook.controller";

export default async function userRoutes(server: FastifyInstance) { 
  server.get("/sync-logbook", logbookController.syncLogs);
}
