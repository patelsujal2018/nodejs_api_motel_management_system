'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('States', [
      { name: 'gujarat', country_id: 1 }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('States', null, {});
  }
};
