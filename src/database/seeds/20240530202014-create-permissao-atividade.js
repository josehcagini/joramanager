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
          descricao: 'Bloqueia criar atividade',
          tipo_operacao: TipoOperacaoEnum.CREATE,
          modulo: ModuloEnum.ATIVIDADE,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
        // 2
          descricao: 'Bloqueia deletar outros atividade',
          tipo_operacao: TipoOperacaoEnum.DELETEOTHERS,
          modulo: ModuloEnum.ATIVIDADE,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
        // 3
          descricao: 'Bloqueia deletar seu atividade',
          tipo_operacao: TipoOperacaoEnum.DELETESELF,
          modulo: ModuloEnum.ATIVIDADE,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
        // 4
          descricao: 'Bloqueia alterar outros atividade',
          tipo_operacao: TipoOperacaoEnum.UPDATEOTHERS,
          modulo: ModuloEnum.ATIVIDADE,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
        // 5
          descricao: 'Bloqueia alterar seu atividade',
          tipo_operacao: TipoOperacaoEnum.UPDATESELF,
          modulo: ModuloEnum.ATIVIDADE,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
        // 6
          descricao: 'Bloqueia visualizar outros atividade',
          tipo_operacao: TipoOperacaoEnum.RETRIEVEOTHERS,
          modulo: ModuloEnum.ATIVIDADE,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
        // 7
          descricao: 'Bloqueia visualizar seu atividade',
          tipo_operacao: TipoOperacaoEnum.RETRIEVESELF,
          modulo: ModuloEnum.ATIVIDADE,
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
