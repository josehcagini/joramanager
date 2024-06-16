// eslint-disable-next-line import/no-extraneous-dependencies
const bcryptjs = require('bcryptjs');

/* eslint-disable max-len */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const grupos = {
      dev: 'admin',
    };

    const [resultsGrupo] = await queryInterface.sequelize.query(`select id, nome from dba.grupo where nome in ( '${grupos.dev}' )`);
    const grupoDev = resultsGrupo.find((result) => result.nome === grupos.dev);

    const senhaHash = await bcryptjs.hash(process.env.SENHA_ADMIN, Number(process.env.SALT_SENHA_ADMIN));

    await queryInterface.bulkInsert(
      { tableName: 'usuario', schema: 'dba' },
      [
        {
        // 1
          nome: 'admin',
          senha_hash: senhaHash,
          grupo_id: grupoDev.id,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
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
