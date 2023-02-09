'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MyInvitation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MyInvitation.init({
    CustomerId: DataTypes.INTEGER,
    InvitationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MyInvitation',
  });
  return MyInvitation;
};