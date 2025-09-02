import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/db.config";

export class LogbookContacts extends Model {}

LogbookContacts.init(
  {
    firebase_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
    },
    uid: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
    },
    id: {
      type: DataTypes.TEXT,
      allowNull: true,
      primaryKey: true,
    },

    // Required fields
    adi_imported: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    band: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    call_sign_search_index: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
    },
    contact_time_stamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    contest_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    country: {
      type: DataTypes.TEXT,
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
      type: DataTypes.TEXT,
      allowNull: false,
    },
    grid: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    log_book: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    log_book_id: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    my_call_sign: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    my_city: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    my_coordinates: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    my_country: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    my_flag_code: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    my_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    my_profile_pic: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    my_state: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    my_state_long_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    power: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    profile_call_sign: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rst_r_c_v_d: {
      type: DataTypes.DATE, // ⚠️ Consider changing to TEXT if it's a signal report (e.g., "59")
      allowNull: false,
    },
    rst_sent: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    state: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    state_long_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
    },
    their_callsign: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    their_coordinates: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    their_country: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    their_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    their_state: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    time: {
      type: DataTypes.TEXT,
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
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_mode: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    // Optional fields
    my_antenna: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    my_radio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    name_search_index: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
    operator: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    qth: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    their_city: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    their_park: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_qth: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    activities: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
    activities_data: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    activities_references: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
    adi_error: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    adi_file_name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    contact_TEXT: {
      type: DataTypes.TEXT,
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
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
    my_park: {
      type: DataTypes.DATE, // ⚠️ Consider: TEXT if storing park codes
      allowNull: true,
    },
    primary_activity: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    raw_data: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    their_activities: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
    their_activity_references: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
    validation_errors: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    lotw_imported_on: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    lotw_uploaded_on: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    qrz_imported_on: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    qrz_uploaded_on: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    duplicate: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    contest_points: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    continent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    country_code: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cw: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    digital: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    dxcc_number: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    exchange_one: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    exchange_two: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    flag_code: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_w_f_d_contact: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    item_index: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    their_call_sign: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    voice: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    app_version: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    contest_name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    exchange_four: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    exchange_three: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    my_antenna_id: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    my_name_search_index: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
    my_radio_id: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    my_saved_location_id: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    their_address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    their_profile_pic: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'LogBookContacts',
    timestamps: false,
  }
);