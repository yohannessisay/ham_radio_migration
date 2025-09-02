'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LogBookContacts', {
      firebase_id: {
        type: Sequelize.TEXT,
        allowNull: true,
        primaryKey: true,
      },
      uid: {
        type: Sequelize.TEXT,
        allowNull: true,
        primaryKey: true,
      },
      id: {
        type: Sequelize.TEXT,
        allowNull: true,
        primaryKey: true,
      },

      // Required fields
      adi_imported: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      band: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      call_sign_search_index: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: true,
      },
      contact_time_stamp: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      contest_id: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      country: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      distance: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      frequency: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      grid: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      log_book: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      log_book_id: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      my_call_sign: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      my_city: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      my_coordinates: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      my_country: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      my_flag_code: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      my_name: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      my_profile_pic: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      my_state: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      my_state_long_name: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      power: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      profile_call_sign: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      rst_r_c_v_d: {
        type: Sequelize.TEXT, 
        allowNull: true,
      },
      rst_sent: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      state: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      state_long_name: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: true,
      },
      their_callsign: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      their_coordinates: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      their_country: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      their_name: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      their_state: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      time: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      user_grid: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      user_mode: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      // Optional fields
      my_antenna: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      my_radio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      name_search_index: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: true,
      },
      operator: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      qth: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      their_city: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      their_park: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      user_qth: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      activities: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: true,
      },
      activities_data: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      activities_references: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: true,
      },
      adi_error: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      adi_file_name: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      contact_TEXT: {
        type: Sequelize.TEXT,
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
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: true,
      },
      my_park: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      primary_activity: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      raw_data: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      their_activities: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: true,
      },
      their_activity_references: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: true,
      },
      validation_errors: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      lotw_imported_on: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      lotw_uploaded_on: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      qrz_imported_on: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      qrz_uploaded_on: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      duplicate: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      contest_points: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      continent: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      country_code: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      cw: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      digital: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      dxcc_number: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      exchange_one: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      exchange_two: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      flag_code: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      is_w_f_d_contact: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      item_index: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      their_call_sign: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      voice: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      app_version: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      contest_name: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      exchange_four: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      exchange_three: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      my_antenna_id: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      my_name_search_index: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: true,
      },
      my_radio_id: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      my_saved_location_id: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      their_address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      their_profile_pic: {
        type: Sequelize.TEXT,
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