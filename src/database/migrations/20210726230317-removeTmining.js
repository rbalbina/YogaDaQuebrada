'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('student_enrollment', 'time_id');
  },
  down: async (queryInterface) => {
    await queryInterface.addColumn('student_enrollment', 'time_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};