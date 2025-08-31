'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserProfile', {
      firebase_id: {
        type: Sequelize.TEXT,
        allowNull: true, // ← nullable
        primaryKey: true,
      },
      uid: {
        type: Sequelize.TEXT,
        allowNull: true,
        primaryKey: true,
      },

      // All fields nullable
      address: { type: Sequelize.TEXT, allowNull: true },
      bio: { type: Sequelize.TEXT, allowNull: true },
      call_sign: { type: Sequelize.TEXT, allowNull: true },
      callsign_search_index: { type: Sequelize.ARRAY(Sequelize.TEXT), allowNull: true },
      city: { type: Sequelize.TEXT, allowNull: true },
      continent: { type: Sequelize.TEXT, allowNull: true },
      coordinates: { type: Sequelize.JSONB, allowNull: true },
      country: { type: Sequelize.TEXT, allowNull: true },
      country_code: { type: Sequelize.TEXT, allowNull: true },
      cq_zone: { type: Sequelize.BIGINT, allowNull: true },
      dxcc_number: { type: Sequelize.BIGINT, allowNull: true },
      email: { type: Sequelize.TEXT, allowNull: true },
      first_name: { type: Sequelize.TEXT, allowNull: true },
      flag_code: { type: Sequelize.TEXT, allowNull: true },
      grid_square: { type: Sequelize.TEXT, allowNull: true },
      itu_zone: { type: Sequelize.BIGINT, allowNull: true },
      last_name: { type: Sequelize.TEXT, allowNull: true },
      name_search_index: { type: Sequelize.ARRAY(Sequelize.TEXT), allowNull: true },
      needs_location_onboarding: { type: Sequelize.BOOLEAN, allowNull: true },
      phone_number: { type: Sequelize.TEXT, allowNull: true },
      provide_id: { type: Sequelize.TEXT, allowNull: true },
      state: { type: Sequelize.TEXT, allowNull: true },
      timestamp: { type: Sequelize.DATE, allowNull: true },

      last_contact_modification: { type: Sequelize.DATE, allowNull: true },
      needs_aggregation: { type: Sequelize.BOOLEAN, allowNull: true },
      number_of_contacts_imported: { type: Sequelize.BIGINT, allowNull: true },
      quota: { type: Sequelize.JSONB, allowNull: true },
      saved_location_id: { type: Sequelize.TEXT, allowNull: true },
      has_streak: { type: Sequelize.BOOLEAN, allowNull: true },
      streak_stats: { type: Sequelize.JSONB, allowNull: true },
      contests: { type: Sequelize.ARRAY(Sequelize.TEXT), allowNull: true },
      stripe_id: { type: Sequelize.TEXT, allowNull: true },
      stripe_link: { type: Sequelize.TEXT, allowNull: true },
      founding_member_count: { type: Sequelize.BIGINT, allowNull: true },
      membership_status: { type: Sequelize.TEXT, allowNull: true },
      number_of_contacts: { type: Sequelize.BIGINT, allowNull: true },
      settings: { type: Sequelize.JSONB, allowNull: true },
      spotting_filters: { type: Sequelize.JSONB, allowNull: true },
      subscription_canceled_at: { type: Sequelize.TEXT, allowNull: true },
      subscription_cancel_on_period_end: { type: Sequelize.TEXT, allowNull: true },
      subscription_created_at: { type: Sequelize.TEXT, allowNull: true },
      subscription_ended_at: { type: Sequelize.TEXT, allowNull: true },
      subscription_status: { type: Sequelize.TEXT, allowNull: true },
      bands: { type: Sequelize.JSONB, allowNull: true },
      modes: { type: Sequelize.JSONB, allowNull: true },
      long_bio: { type: Sequelize.TEXT, allowNull: true },
      state_long_name: { type: Sequelize.TEXT, allowNull: true },
      admin: { type: Sequelize.BOOLEAN, allowNull: true },
      auto_export_to_qrz_lotw: { type: Sequelize.BOOLEAN, allowNull: true },
      default_logbook_settings: { type: Sequelize.JSONB, allowNull: true },
      facebook: { type: Sequelize.TEXT, allowNull: true },
      instagram: { type: Sequelize.TEXT, allowNull: true },
      linkedin: { type: Sequelize.TEXT, allowNull: true },
      profile_pic: { type: Sequelize.TEXT, allowNull: true },
      twitter: { type: Sequelize.TEXT, allowNull: true },
      activator: { type: Sequelize.JSONB, allowNull: true },
      activity_graph_repaired: { type: Sequelize.BOOLEAN, allowNull: true },
      bug_count: { type: Sequelize.BIGINT, allowNull: true },
      hunter: { type: Sequelize.JSONB, allowNull: true },
      spots_created: { type: Sequelize.BIGINT, allowNull: true },
    }, {
      timestamps: false
    });

    // Add indexes
    await queryInterface.addIndex('UserProfile', ['uid'], { name: 'userprofile_uid_idx' });
    await queryInterface.addIndex('UserProfile', ['call_sign'], { name: 'userprofile_call_sign_idx' });
    await queryInterface.addIndex('UserProfile', ['email'], { name: 'userprofile_email_idx' });
    await queryInterface.addIndex('UserProfile', ['timestamp'], { name: 'userprofile_timestamp_idx' });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('UserProfile');
  }
};