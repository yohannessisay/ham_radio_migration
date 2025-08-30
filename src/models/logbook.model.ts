import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.config";
import { UserProfile } from "./user.model";

export class LogBook extends Model {}

LogBook.init(
  {
    firebase_id: { type: DataTypes.STRING, primaryKey: true },
    user_firebase_id: { type: DataTypes.STRING, references: { model: UserProfile, key: "firebase_id" } },
    name: { type: DataTypes.STRING },
    coordinates: { type: DataTypes.JSONB },
    timestamp: { type: DataTypes.DATE },
    lastContactTimestamp: { type: DataTypes.DATE },
    contactCount: { type: DataTypes.INTEGER },
    myRadio: { type: DataTypes.STRING },
    myAntenna: { type: DataTypes.STRING },
  },
  { sequelize, tableName: "LogBook" }
);
