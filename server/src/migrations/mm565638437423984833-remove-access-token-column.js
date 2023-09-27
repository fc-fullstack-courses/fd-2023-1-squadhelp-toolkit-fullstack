'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'accessToken');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'accessToken',
      {
        type: Sequelize.TEXT,
        allowNull: true,
      }
    );
  }
};
