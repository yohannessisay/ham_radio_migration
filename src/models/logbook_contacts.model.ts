import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.config";
import { UserProfile } from "./user.model";
import { LogBook } from "./logbook.model";

export class LogbookContacts extends Model {}

LogbookContacts.init(
  {
    firebase_id: { type: DataTypes.STRING, primaryKey: true },
    uid: { type: DataTypes.STRING, references: { model: UserProfile, key: "uid" } },
    logBookId: { type: DataTypes.STRING, references: { model: LogBook, key: "firebase_id" }, allowNull: true },
    myCallSign: { type: DataTypes.STRING },
    profileCallSign: { type: DataTypes.STRING },
    theirCallsign: { type: DataTypes.STRING },
    band: { type: DataTypes.STRING },
    userMode: { type: DataTypes.STRING },
    // Added fields to match migration and sync
    myName: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING },
    myCountry: { type: DataTypes.STRING },
    myCity: { type: DataTypes.STRING },
    myState: { type: DataTypes.STRING },
    nameSearchIndex: { type: DataTypes.ARRAY(DataTypes.STRING) },
    myNameSearchIndex: { type: DataTypes.ARRAY(DataTypes.STRING) },
    // Additional fields present in migration and used by sync
    userQth: { type: DataTypes.STRING },
    flagCode: { type: DataTypes.STRING },
    userGrid: { type: DataTypes.STRING },
    myAntenna: { type: DataTypes.STRING },
    myRadio: { type: DataTypes.STRING },
    callSignSearchIndex: { type: DataTypes.ARRAY(DataTypes.STRING) },
    continent: { type: DataTypes.STRING },
    distance: { type: DataTypes.FLOAT },
    contactTimeStamp: { type: DataTypes.DATE },
    active: { type: DataTypes.BOOLEAN },
    date: { type: DataTypes.DATE },
    timestamp: { type: DataTypes.DATE },
    coordinates: { type: DataTypes.JSONB },
    notes: { type: DataTypes.TEXT },
  },
  { sequelize, tableName: "LogBookContacts" }
);
