import { Model } from 'sequelize';

export default class GrupoPermissao extends Model {
  static init(sequelize) {
    super.init({

    }, {
      sequelize,
      tableName: 'grupo_permissao',
      schema: 'dba',
    });
    return this;
  }

  static associateManyToMany(models) {
    const [Grupo, Permissao] = models;

    Grupo.belongsToMany(Permissao, { through: GrupoPermissao });
    Permissao.belongsToMany(Grupo, { through: GrupoPermissao });
  }
}
