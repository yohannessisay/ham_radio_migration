import Fastify from "fastify";
import userRoutes from "./src/routes/user.route.ts"; 
import FirebaseService from "./src/services/firebase.service.js";
import syncRoutes from "./src/routes/sync.route.ts";
import logbookRoutes from "./src/routes/logbook.route.ts";
import logbookContactRoutes from "./src/routes/logbook-contact.route.ts";

const server = Fastify();

// Register CORS plugin
server.register(import('@fastify/cors'), {
  origin: [
    'http://localhost:8000', 
    'http://127.0.0.1:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
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
