const { default: ModuleEnum } = require('../../enum/ModuleEnum');
const { default: TipoOperacaoEnum } = require('../../enum/TipoOperacaoEnum');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'grupo',
      [
        {
          nome: 'admin',
        },
        {
          nome: 'dev',
        },
      ],
    );

    await queryInterface.bulkInsert(
      'permissao',
      [
        {
          descricao: 'Bloqueia criar usuario',
          tipo_operacao: TipoOperacaoEnum.CREATE,
          modulo: ModuleEnum.USUARIO,
        },
        {
          descricao: 'Bloqueia deletar usuario',
          tipo_operacao: TipoOperacaoEnum.DELETE,
          modulo: ModuleEnum.USUARIO,
        },
        {
          descricao: 'Bloqueia alterar usuario',
          tipo_operacao: TipoOperacaoEnum.UPDATE,
          modulo: ModuleEnum.USUARIO,
        },
        {
          descricao: 'Bloqueia visualizar usuario',
          tipo_operacao: TipoOperacaoEnum.RETRIEVEALL,
          modulo: ModuleEnum.USUARIO,
        },
      ],
    );

    await queryInterface.bulkInsert(
      'grupo_permissao',
      [

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
