import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class Usuario extends Model {
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
      senha_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      senha: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 255],
            msg: 'senha deve ter mais que 6 caracteres',
          },
        },
      },
    }, {
      sequelize,
      tableName: 'usuario',
      schema: 'dba',
    });
    this.addHook('beforeSave', async (user) => {
      if (user.senha) {
        user.senha_hash = await bcryptjs.hash(user.senha, 8);
      }
    });
    return this;
  }

  senhaIsValid(password) {
    return bcryptjs.compare(password, this.senha_hash);
  }

  static associate(models) {
    this.belongsTo(models.Grupo, { foreignKey: 'grupo_id' });
    this.hasMany(models.Atividade, { foreignKey: 'usuario_id' });
  }
}
