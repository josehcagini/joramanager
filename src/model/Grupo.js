import Sequelize, { Model } from 'sequelize';

export default class Grupo extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3.255],
            msg: 'nome precisa ter entre 3 e 255 caracteres',
          },
        },
      },
    }, {
      sequelize,
      tableName: 'grupo',
      schema: 'dba',
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.Usuario, { foreignKey: 'grupo_id' });
  }
}
