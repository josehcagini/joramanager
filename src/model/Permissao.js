import Sequelize, { Model } from 'sequelize';

export default class Permissao extends Model {
  static init(sequelize) {
    super.init({
      descricao: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3.255],
            msg: 'descricao precisa ter entre 3 e 255 caracteres',
          },
        },
      },
      bloqueado: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      tipo_operacao: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      modulo: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
    }, {
      sequelize,
      tableName: 'permissao',
      schema: 'dba',
    });
    return this;
  }
}
