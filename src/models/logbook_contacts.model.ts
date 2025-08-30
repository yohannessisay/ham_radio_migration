import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.config";
import { UserProfile } from "./user.model";
import { LogBook } from "./logbook.model";

export class LogbookContacts extends Model {}

LogbookContacts.init(
  {
    firebase_id: { type: DataTypes.STRING, primaryKey: true },
    user_firebase_id: { type: DataTypes.STRING, references: { model: UserProfile, key: "firebase_id" } },
    logBookId: { type: DataTypes.STRING, references: { model: LogBook, key: "firebase_id" }, allowNull: true },
    myCallSign: { type: DataTypes.STRING },
    profileCallSign: { type: DataTypes.STRING },
    theirCallsign: { type: DataTypes.STRING },
    band: { type: DataTypes.STRING },
    userMode: { type: DataTypes.STRING },
    nameSearchIndex: { type: DataTypes.ARRAY(DataTypes.STRING) },
    myNameSearchIndex: { type: DataTypes.ARRAY(DataTypes.STRING) },
    active: { type: DataTypes.BOOLEAN },
    date: { type: DataTypes.DATE },
    timestamp: { type: DataTypes.DATE },
    coordinates: { type: DataTypes.JSONB },
    notes: { type: DataTypes.TEXT },
  },
  { sequelize, tableName: "LogBookContacts" }
);
