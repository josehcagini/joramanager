/* eslint-disable max-len */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const { default: ModuloEnum } = await import('../../enum/ModuloEnum.js');
    const { default: TipoOperacaoEnum } = await import('../../enum/TipoOperacaoEnum.js');

    const grupos = {
      dev: 'dev',
      admin: 'admin',
    };

    const [resultsGrupo] = await queryInterface.sequelize.query(`select id, nome from dba.grupo where nome in ( '${grupos.dev}', '${grupos.admin}' )`);
    const grupoDev = resultsGrupo.find((result) => result.nome === grupos.dev);
    const grupoAdmin = resultsGrupo.find((result) => result.nome === grupos.admin);

    const [resultsPermissao] = await queryInterface.sequelize.query(`select id, descricao, tipo_operacao, modulo from dba.permissao where modulo in ( '${ModuloEnum.ATIVIDADE}' )`);

    await queryInterface.bulkInsert(
      { tableName: 'grupo_permissao', schema: 'dba' },
      [
      // admin
        {
          grupo_id: grupoAdmin.id,
          permissao_id: resultsPermissao.find((result) => result.modulo === ModuloEnum.ATIVIDADE && result.tipo_operacao === TipoOperacaoEnum.CREATE).id,
          bloqueado: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          grupo_id: grupoAdmin.id,
          permissao_id: resultsPermissao.find((result) => result.modulo === ModuloEnum.ATIVIDADE && result.tipo_operacao === TipoOperacaoEnum.DELETEOTHERS).id,
          bloqueado: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          grupo_id: grupoAdmin.id,
          permissao_id: resultsPermissao.find((result) => result.modulo === ModuloEnum.ATIVIDADE && result.tipo_operacao === TipoOperacaoEnum.DELETESELF).id,
          bloqueado: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          grupo_id: grupoAdmin.id,
          permissao_id: resultsPermissao.find((result) => result.modulo === ModuloEnum.ATIVIDADE && result.tipo_operacao === TipoOperacaoEnum.RETRIEVEOTHERS).id,
          bloqueado: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          grupo_id: grupoAdmin.id,
          permissao_id: resultsPermissao.find((result) => result.modulo === ModuloEnum.ATIVIDADE && result.tipo_operacao === TipoOperacaoEnum.RETRIEVESELF).id,
          bloqueado: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          grupo_id: grupoAdmin.id,
          permissao_id: resultsPermissao.find((result) => result.modulo === ModuloEnum.ATIVIDADE && result.tipo_operacao === TipoOperacaoEnum.UPDATEOTHERS).id,
          bloqueado: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          grupo_id: grupoAdmin.id,
          permissao_id: resultsPermissao.find((result) => result.modulo === ModuloEnum.ATIVIDADE && result.tipo_operacao === TipoOperacaoEnum.UPDATESELF).id,
          bloqueado: false,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // dev
        {
          grupo_id: grupoDev.id,
          permissao_id: resultsPermissao.find((result) => result.modulo === ModuloEnum.ATIVIDADE && result.tipo_operacao === TipoOperacaoEnum.CREATE).id,
          bloqueado: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          grupo_id: grupoDev.id,
          permissao_id: resultsPermissao.find((result) => result.modulo === ModuloEnum.ATIVIDADE && result.tipo_operacao === TipoOperacaoEnum.DELETEOTHERS).id,
          bloqueado: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          grupo_id: grupoDev.id,
          permissao_id: resultsPermissao.find((result) => result.modulo === ModuloEnum.ATIVIDADE && result.tipo_operacao === TipoOperacaoEnum.DELETESELF).id,
          bloqueado: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          grupo_id: grupoDev.id,
          permissao_id: resultsPermissao.find((result) => result.modulo === ModuloEnum.ATIVIDADE && result.tipo_operacao === TipoOperacaoEnum.RETRIEVEOTHERS).id,
          bloqueado: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          grupo_id: grupoDev.id,
          permissao_id: resultsPermissao.find((result) => result.modulo === ModuloEnum.ATIVIDADE && result.tipo_operacao === TipoOperacaoEnum.RETRIEVESELF).id,
          bloqueado: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          grupo_id: grupoDev.id,
          permissao_id: resultsPermissao.find((result) => result.modulo === ModuloEnum.ATIVIDADE && result.tipo_operacao === TipoOperacaoEnum.UPDATEOTHERS).id,
          bloqueado: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          grupo_id: grupoDev.id,
          permissao_id: resultsPermissao.find((result) => result.modulo === ModuloEnum.ATIVIDADE && result.tipo_operacao === TipoOperacaoEnum.UPDATESELF).id,
          bloqueado: false,
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
