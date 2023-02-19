'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Countries', [
        { name: 'india', code: '+91' }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Countries', null, {});
  }
};
