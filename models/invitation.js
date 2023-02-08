'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invitation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invitation.belongsTo(models.Customer, {foreignKey: ''})
    }
  }
  Invitation.init({
    routeName: DataTypes.STRING,
    cpw: DataTypes.STRING,
    cpp: DataTypes.STRING,
    weddingDay: DataTypes.DATE,
    greeting: DataTypes.TEXT,
    akadStart: DataTypes.TIME,
    akadEnd: DataTypes.TIME,
    resepsiStart: DataTypes.TIME,
    resepsiEnd: DataTypes.TIME,
    location: DataTypes.STRING,
    CustomerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Invitation',
  });
  return Invitation;
};