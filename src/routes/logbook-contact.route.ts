import { FastifyInstance } from "fastify";
import LogBookContactController from "../controllers/logbook-contact.controller";

export default async function logbookContactRoutes(server: FastifyInstance) {
  server.get("/contacts", LogBookContactController.getLogBookContacts);
  server.get("/contacts/:id", LogBookContactController.getLogBookContactsById);
  server.get(
    "/contacts/getByUserId/:userId",
    LogBookContactController.getLogBookContactsByUserId
  );
}
