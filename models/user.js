'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    first_name: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    last_name: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    dob: {
      type: DataTypes.DATEONLY,
    },
    gender: {
      allowNull: false,
      type: DataTypes.TINYINT(1),
      defaultValue: 0,
      comment: '0=female,1=male,2=other'
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    email_verified_at: {
      type: DataTypes.DATE
    },
    mobile: {
      allowNull: false,
      type: DataTypes.BIGINT
    },
    mobile_verified_at: {
      type: DataTypes.DATE
    },
    password: {
      type: DataTypes.TEXT
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    zipcode: {
      allowNull: false,
      type: DataTypes.BIGINT
    },
    city_id: {
      allowNull: false,
      type: DataTypes.BIGINT
    },
    state_id: {
      allowNull: false,
      type: DataTypes.BIGINT
    },
    country_id: {
      allowNull: false,
      type: DataTypes.BIGINT
    },
    role_id: {
      allowNull: false,
      type: DataTypes.BIGINT
    },
    token: {
      type: DataTypes.TEXT
    },
    status : {
      type : DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 0,
      comment: '0=inactive,1=active,2=deactivated'
    },
    login_status : {
      type : DataTypes.TINYINT(1),
      allowNull: false,
      defaultValue: 0,
      comment: '0=not login,1=login'
    },
    createdAt: {
      allowNull: false,
      field: 'created_at',
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      field: 'updated_at',
      type: DataTypes.DATE
    },
    deletedAt: {
      field: 'deleted_at',
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};