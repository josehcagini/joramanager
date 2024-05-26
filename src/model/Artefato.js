import Sequelize, { Model } from 'sequelize';

import appConfig from '../config/appConfig.js';

export default class Artefato extends Model {
  static init(sequelize) {
    super.init({
      titulo: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3.255],
            msg: 'titulo precisa ter entre 3 e 255 caracteres',
          },
        },
      },
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
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'campo nao pode ser vazio',
          },
        },
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'campo nao pode ser vazio',
          },
        },
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${appConfig.url}/images/${this.getDataValue('filename')}`;
        },

      },
    }, {
      sequelize,
      tableName: 'artefato',
      schema: 'dba',
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Atividade, { foreignKey: 'atividade_id' });
  }
}
