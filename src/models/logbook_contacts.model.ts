import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.config";

export class LogbookContacts extends Model {}

LogbookContacts.init(
  {
    firebase_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    uid: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    id: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
    },

    // Required fields
    adi_imported: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    band: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    call_sign_search_index: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    contact_time_stamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    contest_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    distance: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    frequency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    log_book: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    log_book_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    my_call_sign: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    my_city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    my_coordinates: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    my_country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    my_flag_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    my_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    my_profile_pic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    my_state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    my_state_long_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    power: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_call_sign: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rst_r_c_v_d: {
      type: DataTypes.DATE, // ⚠️ Consider changing to STRING if it's a signal report (e.g., "59")
      allowNull: false,
    },
    rst_sent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state_long_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    their_callsign: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    their_coordinates: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    their_country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    their_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    their_state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    user_grid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_mode: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Optional fields
    my_antenna: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    my_radio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name_search_index: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    operator: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    qth: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    their_city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    their_park: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_qth: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    activities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    activities_data: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    activities_references: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    adi_error: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    adi_file_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contact_string: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    error_message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    has_validation_errors: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    my_activity_references: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    my_park: {
      type: DataTypes.DATE, // ⚠️ Consider: STRING if storing park codes
      allowNull: true,
    },
    primary_activity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    raw_data: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    their_activities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    their_activity_references: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    validation_errors: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    lotw_imported_on: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lotw_uploaded_on: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    qrz_imported_on: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    qrz_uploaded_on: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    duplicate: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    contest_points: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cw: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    digital: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    dxcc_number: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    exchange_one: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    exchange_two: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    flag_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_w_f_d_contact: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    item_index: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    their_call_sign: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    voice: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    app_version: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contest_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    exchange_four: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    exchange_three: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    my_antenna_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    my_name_search_index: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    my_radio_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    my_saved_location_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    their_address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    their_profile_pic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'LogBookContacts',
    timestamps: false,
  }
);