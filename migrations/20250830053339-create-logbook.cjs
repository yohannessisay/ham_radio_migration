'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LogBook', {
      id: { type: Sequelize.STRING, primaryKey: true },
      uid: { type: Sequelize.STRING, references: { model: 'UserProfile', key: 'id' } },
      name: { type: Sequelize.STRING },
      coordinates: { type: Sequelize.JSONB },
      timestamp: { type: Sequelize.BIGINT },
      lastContactTimestamp: { type: Sequelize.BIGINT },
      contactCount: { type: Sequelize.INTEGER },
      myRadio: { type: Sequelize.STRING },
      myAntenna: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('LogBook');
  },
};
