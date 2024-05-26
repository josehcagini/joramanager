/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'usuario',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        senha_hash: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        grupo_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'grupo',
            key: 'id',
            schema: 'dba',
          },
          onDelete: 'NO ACTION',
          onUpdate: 'NO ACTION',
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
    await queryInterface.dropTable('usuario', { schema: 'dba' });
  },
};
