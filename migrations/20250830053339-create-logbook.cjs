"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "LogBook",
      {
        firebase_id: {
          type: Sequelize.STRING,
          allowNull: false,
          primaryKey: true,
        },
        id: {
          type: Sequelize.STRING,
          allowNull: false,
          primaryKey: true,
        },
        uid: {
          type: Sequelize.STRING,
          allowNull: false,
          primaryKey: true,
        },
        last_contact_timestamp: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        timestamp: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        contact_count: {
          type: Sequelize.SMALLINT,
          allowNull: true,
        },
        default_location: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        default_call_sign: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        call_sign_type: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        logbook_style: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        my_antenna: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        my_radio: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        my_parks: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        assisted: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        contest_band: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        contest_power: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        default_band: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        default_frequency: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        default_mode: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        default_power: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        number_of_transmitters: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        operator: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        adi_file: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        adi_file_copy: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        adi_imported: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
        duplicate_contacts: {
          type: Sequelize.SMALLINT,
          allowNull: true,
        },
        error_code: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        failed_contacts: {
          type: Sequelize.SMALLINT,
          allowNull: true,
        },
        file_name: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        import_date: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        import_status: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        locked: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
        success_contacts: {
          type: Sequelize.SMALLINT,
          allowNull: true,
        },
        total_import_contacts: {
          type: Sequelize.SMALLINT,
          allowNull: true,
        },
        contest: {
          type: Sequelize.JSONB,
          allowNull: true,
        },
        contest_id: {
          type: Sequelize.STRING,
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
          type: Sequelize.STRING,
          allowNull: true,
        },
        last_spotted_comment: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        last_spotted_frequency: {
          type: Sequelize.STRING, 
          allowNull: true,
        },
        last_spotted_mode: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        log_book_template_id: {
          type: Sequelize.STRING,
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
