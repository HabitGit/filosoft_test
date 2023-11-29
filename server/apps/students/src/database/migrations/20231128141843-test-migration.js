'use strict';

const {Column, DataType} = require('sequelize-typescript');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('students', {
      personalCode: {
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true,
      },
      name: { type: Sequelize.STRING },
      lastName: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.createTable('grades', {
      id: {
        type: Sequelize.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      subject: { type: DataType.STRING },
      grade: { type: Sequelize.INTEGER },
      personalCode: {
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: 'students',
          },
          key: 'personalCode',
        }
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('grades');
    await queryInterface.dropTable('students');
  }
};
