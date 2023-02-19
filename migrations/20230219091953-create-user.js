'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      dob: {
        type: Sequelize.DATEONLY,
      },
      gender: {
        allowNull: false,
        type: Sequelize.TINYINT(1),
        defaultValue: 0,
        comment: '0=female,1=male,2=other'
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      email_verified_at: {
        type: Sequelize.DATE
      },
      mobile: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      mobile_verified_at: {
        type: Sequelize.DATE
      },
      password: {
        type: Sequelize.TEXT
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      zipcode: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      city_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      state_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      country_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      role_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      token: {
        type: Sequelize.TEXT
      },
      status : {
        type : Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 0,
        comment: '0=inactive,1=active,2=deactivated'
      },
      login_status : {
        type : Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 0,
        comment: '0=not login,1=login'
      },
      createdAt: {
        allowNull: false,
        field: 'created_at',
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: Sequelize.DATE
      },
      deletedAt: {
        field: 'deleted_at',
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};