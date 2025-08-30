import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.config";
import { UserProfile } from "./user.model";

export class LogBook extends Model {}

LogBook.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    uid: { type: DataTypes.STRING, references: { model: UserProfile, key: "id" } },
    name: { type: DataTypes.STRING },
    coordinates: { type: DataTypes.JSONB },
    timestamp: { type: DataTypes.BIGINT },
    lastContactTimestamp: { type: DataTypes.BIGINT },
    contactCount: { type: DataTypes.INTEGER },
    myRadio: { type: DataTypes.STRING },
    myAntenna: { type: DataTypes.STRING },
  },
  { sequelize, tableName: "LogBook" }
);
