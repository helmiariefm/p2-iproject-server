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
    routeName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {msg: 'Invitation name must be unique'},
      validate: {
        notEmpty: {msg: 'Invitation name is requierd'},
        notNull: {msg: 'Invitation name is requierd'}
      }
    },
    cpw: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'CPW is requierd'},
        notNull: {msg: 'CPW is requierd'}
      }
    },
    cpp: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'CPP is requierd'},
        notNull: {msg: 'CPP is requierd'}
      }
    },
    weddingDay: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Wedding date is requierd'},
        notNull: {msg: 'Wedding date is requierd'}
      }
    },
    greeting: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Username is requierd'},
        notNull: {msg: 'Username is requierd'}
      }
    },
    akadStart: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Akad time is requierd'},
        notNull: {msg: 'Akad time is requierd'}
      }
    },
    akadEnd: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Akad time is requierd'},
        notNull: {msg: 'Akad time is requierd'}
      }
    },
    resepsiStart: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Resepsi time is requierd'},
        notNull: {msg: 'Resepsi is requierd'}
      }
    },
    resepsiEnd: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Resepsi time is requierd'},
        notNull: {msg: 'Resepsi time is requierd'}
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Location is requierd'},
        notNull: {msg: 'Location is requierd'}
      }
    },
    quote: DataTypes.STRING,
    CustomerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Invitation',
  });
  return Invitation;
};