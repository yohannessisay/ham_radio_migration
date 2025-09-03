import Fastify from "fastify";
import userRoutes from "../src/routes/user.route.js";
import syncRoutes from "../src/routes/sync.route.js";
import logbookRoutes from "../src/routes/logbook.route.js";
import logbookContactRoutes from "../src/routes/logbook-contact.route.js";
import FirebaseService from "../src/services/firebase.service.js";
import cors from "@fastify/cors";

// Create Fastify instance
const server = Fastify();

// CORS: allow all origins on serverless (adjust later to your domains)
server.register(cors, {
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

// Initialize Firebase
FirebaseService.getInstance();

// Register routes
server.register(userRoutes);
server.register(syncRoutes);
server.register(logbookRoutes);
server.register(logbookContactRoutes);

// Default export for Vercel Node runtime.
// Do NOT call server.listen() in serverless.
export default async function handler(req: any, res: any) {
  await server.ready();
  server.server.emit("request", req, res);
}
