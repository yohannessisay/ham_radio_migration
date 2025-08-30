'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LogbookContacts', {
      id: { type: Sequelize.STRING, primaryKey: true },
      uid: { type: Sequelize.STRING, references: { model: 'UserProfile', key: 'id' } },
      logBookId: { type: Sequelize.STRING, references: { model: 'LogBook', key: 'id' }, allowNull: true },
      myCallSign: { type: Sequelize.STRING },
      profileCallSign: { type: Sequelize.STRING },
      theirCallsign: { type: Sequelize.STRING },
      band: { type: Sequelize.STRING },
      userMode: { type: Sequelize.STRING },
      nameSearchIndex: { type: Sequelize.ARRAY(Sequelize.STRING) },
      myNameSearchIndex: { type: Sequelize.ARRAY(Sequelize.STRING) },
      active: { type: Sequelize.BOOLEAN },
      date: { type: Sequelize.DATE },
      timestamp: { type: Sequelize.BIGINT },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('LogbookContacts');
  },
};
