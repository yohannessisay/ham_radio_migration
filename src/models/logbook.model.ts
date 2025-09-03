import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/db.config";

export class LogBook extends Model {}

LogBook.init(
  {
    firebase_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
    },
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
    },
    uid: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
    },
    last_contact_timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    contact_count: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    default_location: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    default_call_sign: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    call_sign_type: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    logbook_style: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    my_antenna: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    my_radio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    my_parks: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    assisted: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    contest_band: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    contest_power: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    default_band: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    default_frequency: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    default_mode: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    default_power: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    number_of_transmitters: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    operator: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    adi_file: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    adi_file_copy: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    adi_imported: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    duplicate_contacts: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    error_code: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    failed_contacts: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    file_name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    import_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    import_status: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    locked: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    success_contacts: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    total_import_contacts: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    contest: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    contest_id: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    first_import: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    last_spotted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    last_spotted_band: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    last_spotted_comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    last_spotted_frequency: {
      type: DataTypes.TEXT,  
      allowNull: true,
    },
    last_spotted_mode: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    log_book_template_id: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    radio: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  },
  {
    sequelize,
    tableName: 'LogBook',
    schema: "public",
    timestamps: false, // We're managing timestamps manually
  }
);