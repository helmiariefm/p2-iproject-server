'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Invitations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      routeName: {
        type: Sequelize.STRING,
        unique: true
      },
      cpw: {
        type: Sequelize.STRING
      },
      cpp: {
        type: Sequelize.STRING
      },
      weddingDay: {
        type: Sequelize.DATE
      },
      greeting: {
        type: Sequelize.TEXT
      },
      akadStart: {
        type: Sequelize.TIME
      },
      akadEnd: {
        type: Sequelize.TIME
      },
      resepsiStart: {
        type: Sequelize.TIME
      },
      resepsiEnd: {
        type: Sequelize.TIME
      },
      location: {
        type: Sequelize.STRING
      },
      CustomerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Customers',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Invitations');
  }
};