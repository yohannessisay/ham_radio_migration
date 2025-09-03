import Fastify from "fastify";
import userRoutes from "../src/routes/user.route";
import syncRoutes from "../src/routes/sync.route";
import logbookRoutes from "../src/routes/logbook.route";
import logbookContactRoutes from "../src/routes/logbook-contact.route";
import FirebaseService from "../src/services/firebase.service";
import cors from "@fastify/cors";
import serverless from "serverless-http";

const server = Fastify();

server.register(cors, {
  origin: ["http://localhost:8000", "http://127.0.0.1:3000"],
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
});

FirebaseService.getInstance();

server.register(userRoutes);
server.register(syncRoutes);
server.register(logbookRoutes);
server.register(logbookContactRoutes);

// Export ES module-compatible handler
export const handler = serverless(server as any);
