import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.config";

export class UserProfile extends Model {}

UserProfile.init(
  {
    uid: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    callSign: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    phoneNumber: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING },
    state: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    gridSquare: { type: DataTypes.STRING },
    bio: { type: DataTypes.TEXT },
    cqZone: { type: DataTypes.INTEGER },
    ituZone: { type: DataTypes.INTEGER },
    coordinates: { type: DataTypes.JSONB },
    nameSearchIndex: { type: DataTypes.ARRAY(DataTypes.STRING) },
    callsignSearchIndex: { type: DataTypes.ARRAY(DataTypes.STRING) },
    timestamp: { type: DataTypes.DATE },
  },
  { sequelize, tableName: "UserProfile" }
);
