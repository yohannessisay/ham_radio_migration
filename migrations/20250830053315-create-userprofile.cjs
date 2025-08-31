'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserProfile', {
      // Primary Key Fields
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

      // Required Fields
      address: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      call_sign: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      callsign_search_index: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      continent: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      coordinates: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cq_zone: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      dxcc_number: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      flag_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      grid_square: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      itu_zone: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name_search_index: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      needs_location_onboarding: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      provide_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      // Optional Fields
      last_contact_modification: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      needs_aggregation: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      number_of_contacts_imported: {
        type: Sequelize.SMALLINT,
        allowNull: true,
      },
      quota: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      saved_location_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      has_streak: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      streak_stats: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      contests: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      stripe_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      stripe_link: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      founding_member_count: {
        type: Sequelize.SMALLINT,
        allowNull: true,
      },
      membership_status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      number_of_contacts: {
        type: Sequelize.SMALLINT,
        allowNull: true,
      },
      settings: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      spotting_filters: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      subscription_canceled_at: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      subscription_cancel_on_period_end: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      subscription_created_at: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      subscription_ended_at: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      subscription_status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bands: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      modes: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      long_bio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      state_long_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      admin: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      auto_export_to_qrz_lotw: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      default_logbook_settings: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      facebook: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      instagram: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      linkedin: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      profile_pic: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      twitter: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      activator: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      activity_graph_repaired: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      bug_count: {
        type: Sequelize.SMALLINT,
        allowNull: true,
      },
      hunter: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      spots_created: {
        type: Sequelize.SMALLINT,
        allowNull: true,
      },
    }, {
      timestamps: false, // No automatic createdAt/updatedAt
    });

    // Add indexes
    await queryInterface.addIndex('UserProfile', ['uid'], {
      name: 'userprofile_uid_idx',
    });
    await queryInterface.addIndex('UserProfile', ['call_sign'], {
      name: 'userprofile_call_sign_idx',
    });
    await queryInterface.addIndex('UserProfile', ['email'], {
      name: 'userprofile_email_idx',
    });
    await queryInterface.addIndex('UserProfile', ['timestamp'], {
      name: 'userprofile_timestamp_idx',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('UserProfile');
  },
};