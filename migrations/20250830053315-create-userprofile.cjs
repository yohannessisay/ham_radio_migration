'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserProfile', {
      uid: { type: Sequelize.STRING, primaryKey: true },
      firstName: { type: Sequelize.STRING },
      lastName: { type: Sequelize.STRING },
      callSign: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      phoneNumber: { type: Sequelize.STRING },
      country: { type: Sequelize.STRING },
      state: { type: Sequelize.STRING },
      city: { type: Sequelize.STRING },
      address: { type: Sequelize.STRING },
      gridSquare: { type: Sequelize.STRING },
      bio: { type: Sequelize.TEXT },
      cqZone: { type: Sequelize.INTEGER },
      ituZone: { type: Sequelize.INTEGER },
      coordinates: { type: Sequelize.JSONB },
      nameSearchIndex: { type: Sequelize.ARRAY(Sequelize.STRING) },
      callsignSearchIndex: { type: Sequelize.ARRAY(Sequelize.STRING) },
      timestamp: { type: Sequelize.DATE },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
    });
    await queryInterface.addIndex('UserProfile', ['callSign']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('UserProfile');
  },
};
