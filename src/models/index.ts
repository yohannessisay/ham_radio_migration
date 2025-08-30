import { UserProfile } from "./user.model";
import { LogBook } from "./logbook.model";
import { LogbookContacts } from "./logbook_contacts.model";

// UserProfile (uid) -> LogBook.uid
UserProfile.hasMany(LogBook, { foreignKey: "uid", sourceKey: "uid" });
LogBook.belongsTo(UserProfile, { foreignKey: "uid", targetKey: "uid" });

// UserProfile (uid) -> LogBookContacts.uid
UserProfile.hasMany(LogbookContacts, { foreignKey: "uid", sourceKey: "uid" });
LogbookContacts.belongsTo(UserProfile, { foreignKey: "uid", targetKey: "uid" });

// LogBook (firebase_id) -> LogBookContacts.logBookId
LogBook.hasMany(LogbookContacts, { foreignKey: "logBookId", sourceKey: "firebase_id" });
LogbookContacts.belongsTo(LogBook, { foreignKey: "logBookId", targetKey: "firebase_id" });

export { UserProfile, LogBook, LogbookContacts };
