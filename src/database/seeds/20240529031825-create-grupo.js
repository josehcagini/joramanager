/* eslint-disable strict */

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      { tableName: 'grupo', schema: 'dba' },
      [
        {
        // 1
          nome: 'admin',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
        // 2
          nome: 'dev',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {
        schema: 'dba',
      },
    );
  },
  async down() {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
  },
};
