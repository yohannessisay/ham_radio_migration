import { FastifyInstance } from "fastify";
import UserController from "../controllers/users.controller";

export default async function userRoutes(server: FastifyInstance) {
  server.get("/users", UserController.getUsers);
  server.get("/sync-users", UserController.syncUsers);
}
