'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Invitation)
    }
  }
  Customer.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isBuy: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Customer',
  });
  Customer.beforeCreate(el => {
    el.password = hashPassword(el.password)
    el.isBuy = false
  })
  return Customer;
};