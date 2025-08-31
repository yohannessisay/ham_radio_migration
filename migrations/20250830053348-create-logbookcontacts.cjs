'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LogBookContacts', {
      firebase_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      uid: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      id: {
        type: Sequelize.STRING,
        allowNull: true, // Note: notNull=false in schema
        primaryKey: true,
      },

      // Required fields
      adi_imported: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      band: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      call_sign_search_index: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      contact_time_stamp: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      contest_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      distance: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      frequency: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      grid: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      log_book: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      log_book_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      my_call_sign: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      my_city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      my_coordinates: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      my_country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      my_flag_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      my_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      my_profile_pic: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      my_state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      my_state_long_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      power: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profile_call_sign: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rst_r_c_v_d: {
        type: Sequelize.STRING, // ⚠️ Likely typo? Should be TEXT if it's signal report like "59"
        allowNull: false,
      },
      rst_sent: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state_long_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      their_callsign: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      their_coordinates: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      their_country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      their_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      their_state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      time: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      user_grid: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_mode: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      // Optional fields
      my_antenna: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      my_radio: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      name_search_index: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      operator: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      qth: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      their_city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      their_park: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_qth: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      activities: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      activities_data: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      activities_references: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      adi_error: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      adi_file_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contact_string: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      error_message: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      has_validation_errors: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      my_activity_references: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      my_park: {
        type: Sequelize.TEXT, // ⚠️ Schema says TIMESTAMP but likely should be TEXT (e.g., "PARK-123")
        allowNull: true,
      },
      primary_activity: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      raw_data: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      their_activities: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      their_activity_references: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      validation_errors: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      lotw_imported_on: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lotw_uploaded_on: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      qrz_imported_on: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      qrz_uploaded_on: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      duplicate: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      contest_points: {
        type: Sequelize.SMALLINT,
        allowNull: true,
      },
      continent: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      country_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cw: {
        type: Sequelize.SMALLINT,
        allowNull: true,
      },
      digital: {
        type: Sequelize.SMALLINT,
        allowNull: true,
      },
      dxcc_number: {
        type: Sequelize.SMALLINT,
        allowNull: true,
      },
      exchange_one: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      exchange_two: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      flag_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      is_w_f_d_contact: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      item_index: {
        type: Sequelize.SMALLINT,
        allowNull: true,
      },
      their_call_sign: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      voice: {
        type: Sequelize.SMALLINT,
        allowNull: true,
      },
      app_version: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contest_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      exchange_four: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      exchange_three: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      my_antenna_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      my_name_search_index: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      my_radio_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      my_saved_location_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      their_address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      their_profile_pic: {
        type: Sequelize.STRING,
        allowNull: true,
      }
    }, {
      timestamps: false, // We manage timestamps manually
    });

    // Add indexes for performance
    await queryInterface.addIndex('LogBookContacts', ['uid']);
    await queryInterface.addIndex('LogBookContacts', ['log_book_id']);
    await queryInterface.addIndex('LogBookContacts', ['their_callsign']);
    await queryInterface.addIndex('LogBookContacts', ['my_call_sign']);
    await queryInterface.addIndex('LogBookContacts', ['timestamp']);
    await queryInterface.addIndex('LogBookContacts', ['contact_time_stamp']);
    await queryInterface.addIndex('LogBookContacts', ['contest_id']);
    await queryInterface.addIndex('LogBookContacts', ['date']);
    await queryInterface.addIndex('LogBookContacts', ['firebase_id']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('LogBookContacts');
  },
};