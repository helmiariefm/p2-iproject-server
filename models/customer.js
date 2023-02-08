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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Username is requierd'},
        notNull: {msg: 'Username is requierd'}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {msg: 'Email must be unique'},
      validate: {
        isEmail: {msg: 'Invalid email format'},
        notEmpty: {msg: 'Email is requierd'},
        notNull: {msg: 'Email is requierd'}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Password is requierd'},
        notNull: {msg: 'Password is requierd'}
      }
    },
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