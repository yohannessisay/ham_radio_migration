import Fastify from "fastify";
import userRoutes from "../src/routes/user.route";
import FirebaseService from "../src/services/firebase.service";
import syncRoutes from "../src/routes/sync.route";
import logbookRoutes from "../src/routes/logbook.route";
import logbookContactRoutes from "../src/routes/logbook-contact.route";
import serverless from "serverless-http";

// Create Fastify instance
const server = Fastify();

// Register CORS
await server.register(import("@fastify/cors"), {
  origin: [
    "http://localhost:8000",
    "http://127.0.0.1:3000"
  ],
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

// Export handler for Vercel
export const handler = serverless(server as any);
