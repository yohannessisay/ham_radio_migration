import { FastifyInstance } from "fastify"; 
import syncController from "../controllers/sync.controller";

export default async function userRoutes(server: FastifyInstance) {
  server.get("/get-structure", syncController.getStructure);
}
