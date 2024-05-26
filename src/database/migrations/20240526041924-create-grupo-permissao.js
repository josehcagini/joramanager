/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'grupo_permissao',
      {
        grupo_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: false,
          primaryKey: true,
          references: {
            model: 'grupo',
            key: 'id',
            schema: 'dba',
          },
        },
        permissao_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: false,
          primaryKey: true,
          references: {
            model: 'permissao',
            key: 'id',
            schema: 'dba',
          },
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        schema: 'dba',
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('grupo_permissao', { schema: 'dba' });
  },
};
