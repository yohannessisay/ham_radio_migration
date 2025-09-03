import { FastifyInstance } from "fastify"; 
import syncController from "../controllers/sync.controller";

export default async function syncRoutes(server: FastifyInstance) {
  server.get("/sync-all", syncController.syncAll);
  server.get("/get-structure", syncController.getStructure);
}
