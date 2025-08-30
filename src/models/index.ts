import { UserProfile } from "./user.model";
import { LogBook } from "./logbook.model";
import { LogbookContacts } from "./logbook_contacts.model";

UserProfile.hasMany(LogBook, { foreignKey: "uid" });
LogBook.belongsTo(UserProfile, { foreignKey: "uid" });

UserProfile.hasMany(LogbookContacts, { foreignKey: "uid" });
LogbookContacts.belongsTo(UserProfile, { foreignKey: "uid" });

LogBook.hasMany(LogbookContacts, { foreignKey: "logBookId" });
LogbookContacts.belongsTo(LogBook, { foreignKey: "logBookId" });

export { UserProfile, LogBook, LogbookContacts };
