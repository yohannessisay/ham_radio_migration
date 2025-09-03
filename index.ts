import Fastify from "fastify";
import userRoutes from "./src/routes/user.route";
import FirebaseService from "./src/services/firebase.service";
import syncRoutes from "./src/routes/sync.route";
import logbookRoutes from "./src/routes/logbook.route";
import logbookContactRoutes from "./src/routes/logbook-contact.route";
import cors from "@fastify/cors";

const server = Fastify();
 
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
    if (!origin) { 
      return cb(null, true);
    }
    if (explicitAllowList.has(origin)) {
      return cb(null, true);
    }
    if (allowedOriginPatterns.some((re) => re.test(origin))) {
      return cb(null, true);
    } 
    return cb(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

FirebaseService.getInstance();

server.register(userRoutes);
server.register(syncRoutes);
server.register(logbookRoutes);
server.register(logbookContactRoutes);

const start = async () => {
  try {
    await server.listen({ port: 4000, host: "0.0.0.0" });
    console.log("✅ Server listening on port 4000");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
