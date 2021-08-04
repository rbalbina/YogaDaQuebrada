'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('student_enrollment', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      class_id: {
        type: Sequelize.INTEGER,
        references: { model: 'classes', key: 'id'},
        onDelete: 'CASCADE',
        allowNull: false,
      },
      
      student_id: {
        type: Sequelize.INTEGER,
        references: { model:'users', key: 'id'},
        onDelete: 'CASCADE',
        allowNull: false,
      },

      room_link: {
        type: Sequelize.STRING,
        allowNull: true,
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
  down: async (queryInterface) => {
    await queryInterface.dropTable('student_enrollment');
  }
};