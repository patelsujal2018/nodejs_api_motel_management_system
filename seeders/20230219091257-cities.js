'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Cities', [
      { name: 'surat', state_id: 1, country_id: 1 }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Cities', null, {});
  }
};
