import { FastifyInstance } from "fastify";
import LogBookContactController from "../controllers/logbook-contact.controller";

export default async function logbookContactRoutes(server: FastifyInstance) {
  server.get("/logbook-contacts", LogBookContactController.getLogBookContacts);
  server.get("/logbook-contacts/:id", LogBookContactController.getLogBookContactById);
}