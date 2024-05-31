import Sequelize from 'sequelize';
import databaseConfig from '../config/database/database.js';
import Usuario from '../model/Usuario.js';
import Grupo from '../model/Grupo.js';
import Permissao from '../model/Permissao.js';
import GrupoPermissao from '../model/GrupoPermissao.js';
import Atividade from '../model/Atividade.js';
import Artefato from '../model/Artefato.js';

const models = [Usuario, Grupo, Permissao, GrupoPermissao, Atividade, Artefato];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
models.forEach((model) => model.associateManyToMany && model.associateManyToMany(models));
