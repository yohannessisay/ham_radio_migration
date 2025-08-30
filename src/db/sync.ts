import { sequelize } from "../config/db.config";
import { UserProfile, LogBook, LogbookContacts } from "../models";

async function syncDB() {
  await sequelize.sync({ alter: true }); // automatically updates tables
  console.log("✅ Database synced");
}

syncDB();
