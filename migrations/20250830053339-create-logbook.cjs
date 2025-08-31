"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "LogBook",
      {
        firebase_id: {
          type: Sequelize.TEXT,
          allowNull: true,
          primaryKey: true,
        },
        id: {
          type: Sequelize.TEXT,
          allowNull: true,
          primaryKey: true,
        },
        uid: {
          type: Sequelize.TEXT,
          allowNull: true,
          primaryKey: true,
        },
        last_contact_timestamp: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        name: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        timestamp: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        contact_count: {
          type: Sequelize.BIGINT,
          allowNull: true,
        },
        default_location: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        default_call_sign: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        call_sign_type: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        logbook_style: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        my_antenna: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        my_radio: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        my_parks: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        assisted: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        contest_band: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        contest_power: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        default_band: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        default_frequency: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        default_mode: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        default_power: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        number_of_transmitters: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        operator: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        adi_file: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        adi_file_copy: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        adi_imported: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
        duplicate_contacts: {
          type: Sequelize.BIGINT,
          allowNull: true,
        },
        error_code: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        failed_contacts: {
          type: Sequelize.BIGINT,
          allowNull: true,
        },
        file_name: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        import_date: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        import_status: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        locked: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
        success_contacts: {
          type: Sequelize.BIGINT,
          allowNull: true,
        },
        total_import_contacts: {
          type: Sequelize.BIGINT,
          allowNull: true,
        },
        contest: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        contest_id: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        first_import: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
        last_spotted_at: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        last_spotted_band: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        last_spotted_comment: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        last_spotted_frequency: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        last_spotted_mode: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        log_book_template_id: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        radio: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      },
      {
        timestamps: false,
      }
    );

    // Add indexes for performance
    await queryInterface.addIndex("LogBook", ["uid"]);
    await queryInterface.addIndex("LogBook", ["name"]);
    await queryInterface.addIndex("LogBook", ["timestamp"]);
    await queryInterface.addIndex("LogBook", ["last_contact_timestamp"]);
    await queryInterface.addIndex("LogBook", ["firebase_id"]);
    await queryInterface.addIndex("LogBook", ["contest_id"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("LogBook");
  },
};
