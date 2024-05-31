/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const { default: ModuloEnum } = await import('../../enum/ModuloEnum.js');
    const { default: TipoOperacaoEnum } = await import('../../enum/TipoOperacaoEnum.js');

    await queryInterface.bulkInsert(
      { tableName: 'permissao', schema: 'dba' },
      [
        {
        // 1
          descricao: 'Bloqueia criar usuario',
          tipo_operacao: TipoOperacaoEnum.CREATE,
          modulo: ModuloEnum.USUARIO,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
        // 2
          descricao: 'Bloqueia deletar outros usuario',
          tipo_operacao: TipoOperacaoEnum.DELETEOTHERS,
          modulo: ModuloEnum.USUARIO,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
        // 3
          descricao: 'Bloqueia deletar seu usuario',
          tipo_operacao: TipoOperacaoEnum.DELETESELF,
          modulo: ModuloEnum.USUARIO,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
        // 4
          descricao: 'Bloqueia alterar outros usuario',
          tipo_operacao: TipoOperacaoEnum.UPDATEOTHERS,
          modulo: ModuloEnum.USUARIO,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
        // 5
          descricao: 'Bloqueia alterar seu usuario',
          tipo_operacao: TipoOperacaoEnum.UPDATESELF,
          modulo: ModuloEnum.USUARIO,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
        // 6
          descricao: 'Bloqueia visualizar outros usuario',
          tipo_operacao: TipoOperacaoEnum.RETRIEVEOTHERS,
          modulo: ModuloEnum.USUARIO,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
        // 7
          descricao: 'Bloqueia visualizar seu usuario',
          tipo_operacao: TipoOperacaoEnum.RETRIEVESELF,
          modulo: ModuloEnum.USUARIO,
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
