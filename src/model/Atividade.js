import Sequelize, { Model } from 'sequelize';

export default class Atividade extends Model {
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
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      dtEntrega: {
        type: Sequelize.DATE,
      },
    }, {
      sequelize,
      tableName: 'atividade',
      schema: 'dba',
    });
    return this;
  }

  static associate(models) {
    this.hasOne(models.Atividade, { foreignKey: 'atividade_pai_id' });

    this.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
    this.hasMany(models.Artefato, { foreignKey: 'atividade_id' });
  }
}
