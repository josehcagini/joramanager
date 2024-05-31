import Sequelize, { Model } from 'sequelize';
import Grupo from './Grupo.js';
import Permissao from './Permissao.js';

export default class GrupoPermissao extends Model {
  static init(sequelize) {
    super.init({
      bloqueado: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    }, {
      sequelize,
      tableName: 'grupo_permissao',
      schema: 'dba',
    });
    return this;
  }

  static associateManyToMany() {
    Grupo.belongsToMany(Permissao, { through: GrupoPermissao });
    Permissao.belongsToMany(Grupo, { through: GrupoPermissao });
  }
}
