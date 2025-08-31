import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.config";

export class LogBook extends Model {}

LogBook.init(
  {
    firebase_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    uid: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    last_contact_timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    contact_count: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    default_location: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    default_call_sign: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    call_sign_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    logbook_style: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    my_antenna: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    my_radio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    my_parks: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    assisted: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contest_band: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contest_power: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    default_band: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    default_frequency: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    default_mode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    default_power: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    number_of_transmitters: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    operator: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    adi_file: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    adi_file_copy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    adi_imported: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    duplicate_contacts: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    error_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    failed_contacts: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    file_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    import_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    import_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    locked: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    success_contacts: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    total_import_contacts: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    contest: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    contest_id: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_spotted_comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_spotted_frequency: {
      type: DataTypes.STRING,  
      allowNull: true,
    },
    last_spotted_mode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    log_book_template_id: {
      type: DataTypes.STRING,
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
    timestamps: false, // We're managing timestamps manually
  }
);