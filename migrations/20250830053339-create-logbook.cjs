'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LogBook', {
      id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      firebase_id: { type: Sequelize.STRING, allowNull: false, unique: true },
      name: { type: Sequelize.STRING },
      myAntenna: { type: Sequelize.STRING },
      myRadio: { type: Sequelize.STRING },
      coordinates: { type: Sequelize.JSONB },
      timestamp: { type: Sequelize.DATE },
      lastContactTimestamp: { type: Sequelize.DATE },
      contactCount: { type: Sequelize.INTEGER },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('LogBook');
  },
};
