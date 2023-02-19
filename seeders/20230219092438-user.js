'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      first_name: 'sujal',
      last_name: 'patel',
      dob: '1996-01-08',
      gender: 1,
      email: 'patelsujal2021@gmail.com',
      email_verified_at: new Date(),
      mobile: 9876543210,
      mobile_verified_at: new Date(),
      password: bcrypt.hashSync('123456789', 10),
      address: 'address',
      zipcode: 111111,
      city_id: 1,
      state_id: 1,
      country_id: 1,
      role_id: 1,
      status: 1,
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
