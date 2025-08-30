import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.config";
import { UserProfile } from "./user.model";
import { LogBook } from "./logbook.model";

export class LogbookContacts extends Model {}

LogbookContacts.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    uid: { type: DataTypes.STRING, references: { model: UserProfile, key: "id" } },
    logBookId: { type: DataTypes.STRING, references: { model: LogBook, key: "id" }, allowNull: true },
    myCallSign: { type: DataTypes.STRING },
    profileCallSign: { type: DataTypes.STRING },
    theirCallsign: { type: DataTypes.STRING },
    band: { type: DataTypes.STRING },
    userMode: { type: DataTypes.STRING },
    nameSearchIndex: { type: DataTypes.ARRAY(DataTypes.STRING) },
    myNameSearchIndex: { type: DataTypes.ARRAY(DataTypes.STRING) },
    active: { type: DataTypes.BOOLEAN },
    date: { type: DataTypes.DATE },
    timestamp: { type: DataTypes.BIGINT },
  },
  { sequelize, tableName: "LogbookContacts" }
);
