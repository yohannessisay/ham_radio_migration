import { sequelize } from "../config/db.config"; 

async function syncDB() {
  await sequelize.sync({ alter: true }); // automatically updates tables
  console.log("✅ Database synced");
}

syncDB();
