import Fastify from "fastify";
import userRoutes from "../src/routes/user.route.js";
import syncRoutes from "../src/routes/sync.route.js";
import logbookRoutes from "../src/routes/logbook.route.js";
import logbookContactRoutes from "../src/routes/logbook-contact.route.js";
import FirebaseService from "../src/services/firebase.service.js";
import cors from "@fastify/cors";

const server = Fastify();

// CORS: allow all origins on serverless (adjust later to your domains)
// CORS: dynamic whitelist (supports env, common hostings, and localhost)
const envOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

const explicitAllowList = new Set<string>([
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:8000",
  "http://127.0.0.1:8000",
  "https://wrlyohannes.firebaseapp.com",
  "https://wrlyohannes.web.app",
  // Add your frontend domain(s) for Vercel as needed
  ...envOrigins,
]);

const allowedOriginPatterns = [
  /^https?:\/\/localhost:\d+$/i,
  /^https?:\/\/127\.0\.0\.1:\d+$/i,
  /^https:\/\/.*\.vercel\.app$/i,
  /^https:\/\/.*\.firebaseapp\.com$/i,
  /^https:\/\/.*\.web\.app$/i,
];

server.register(cors, {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (explicitAllowList.has(origin)) return cb(null, true);
    if (allowedOriginPatterns.some(re => re.test(origin))) return cb(null, true);
    return cb(null, false);
  },
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

export default async function handler(req: any, res: any) {
  await server.ready();
  server.server.emit("request", req, res);
}
