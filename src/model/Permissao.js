import Sequelize, { Model } from 'sequelize';

export default class Grupo extends Model {
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
    }, {
      sequelize,
      tableName: 'permissao',
      schema: 'dba',
    });
    return this;
  }
}
