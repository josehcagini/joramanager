/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createSchema('dba', {

    });
  },

  async down(queryInterface) {
    await queryInterface.dropSchema('dba');
  },
};
