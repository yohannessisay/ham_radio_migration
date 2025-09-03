import Fastify from "fastify";
import userRoutes from "../src/routes/user.route";
import syncRoutes from "../src/routes/sync.route";
import logbookRoutes from "../src/routes/logbook.route";
import logbookContactRoutes from "../src/routes/logbook-contact.route";
import FirebaseService from "../src/services/firebase.service";
import cors from "@fastify/cors";

const server = Fastify();

server.register(cors, {
  // Allow all origins in serverless to avoid CORS headaches on Vercel
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

FirebaseService.getInstance();

server.register(userRoutes);
server.register(syncRoutes);
server.register(logbookRoutes);
server.register(logbookContactRoutes);

// IMPORTANT: Default export for Vercel Node runtime; no server.listen() here.
export default async function handler(req: any, res: any) {
  await server.ready();
  server.server.emit("request", req, res);
}
