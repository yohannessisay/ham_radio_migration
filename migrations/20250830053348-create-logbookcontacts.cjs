'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LogBookContacts', {
      firebase_id: { type: Sequelize.STRING, primaryKey: true },
      uid: {
        type: Sequelize.STRING,
        references: { model: 'UserProfile', key: 'uid' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      logBookId: {
        type: Sequelize.STRING,
        references: { model: 'LogBook', key: 'firebase_id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      theirCallsign: { type: Sequelize.STRING },
      profileCallSign: { type: Sequelize.STRING },
      band: { type: Sequelize.STRING },
      userQth: { type: Sequelize.STRING },
      country: { type: Sequelize.STRING },
      flagCode: { type: Sequelize.STRING },
      userGrid: { type: Sequelize.STRING },
      myCity: { type: Sequelize.STRING },
      myCountry: { type: Sequelize.STRING },
      myState: { type: Sequelize.STRING },
      myName: { type: Sequelize.STRING },
      myCallSign: { type: Sequelize.STRING },
      myAntenna: { type: Sequelize.STRING },
      myRadio: { type: Sequelize.STRING },
      userMode: { type: Sequelize.STRING },
      contactTimeStamp: { type: Sequelize.DATE },
      timestamp: { type: Sequelize.DATE },
      date: { type: Sequelize.DATE },
      coordinates: { type: Sequelize.JSONB },
      nameSearchIndex: { type: Sequelize.ARRAY(Sequelize.STRING) },
      myNameSearchIndex: { type: Sequelize.ARRAY(Sequelize.STRING) },
      callSignSearchIndex: { type: Sequelize.ARRAY(Sequelize.STRING) },
      active: { type: Sequelize.BOOLEAN },
      notes: { type: Sequelize.TEXT },
      continent: { type: Sequelize.STRING },
      distance: { type: Sequelize.FLOAT },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('LogBookContacts');
  },
};
