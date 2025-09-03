import { FastifyInstance } from "fastify";
import LogBookController from "../controllers/logbook.controller";

export default async function logbookRoutes(server: FastifyInstance) {
  server.get("/logbooks", LogBookController.getLogBooks); 
  server.get("/logbooks/getByUserId/:userId", LogBookController.getLogBooksByUserId); 
  server.get("/logbooks/:id", LogBookController.getLogBookById);
}