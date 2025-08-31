import Fastify from "fastify";
import userRoutes from "./src/routes/user.route.ts"; 
import FirebaseService from "./src/services/firebase.service.js";
import syncRoutes from "./src/routes/sync.route.ts";
const server = Fastify();

FirebaseService.getInstance();

server.register(userRoutes); 
server.register(syncRoutes);

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
