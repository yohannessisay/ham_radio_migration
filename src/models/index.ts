import { UserProfile } from "./user.model";
import { LogBook } from "./logbook.model";
import { LogbookContacts } from "./logbook_contacts.model";

// UserProfile (firebase_id) -> LogBook.user_firebase_id
UserProfile.hasMany(LogBook, { foreignKey: "user_firebase_id", sourceKey: "firebase_id" });
LogBook.belongsTo(UserProfile, { foreignKey: "user_firebase_id", targetKey: "firebase_id" });

// UserProfile (firebase_id) -> LogBookContacts.user_firebase_id
UserProfile.hasMany(LogbookContacts, { foreignKey: "user_firebase_id", sourceKey: "firebase_id" });
LogbookContacts.belongsTo(UserProfile, { foreignKey: "user_firebase_id", targetKey: "firebase_id" });

// LogBook (firebase_id) -> LogBookContacts.logBookId
LogBook.hasMany(LogbookContacts, { foreignKey: "logBookId", sourceKey: "firebase_id" });
LogbookContacts.belongsTo(LogBook, { foreignKey: "logBookId", targetKey: "firebase_id" });

export { UserProfile, LogBook, LogbookContacts };
