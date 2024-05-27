import Usuario from '../model/Usuario.js';
import GenericError from '../error/GenericError.js';
import UsuarioEntity from '../entity/UsuarioEntity.js';

class UsuarioRepo {
  async findOne(options) {
    const res = await Usuario.findOne(options);

    if (!res) {
      return res;
    }

    const usuario = UsuarioEntity.fromModel(await res.dataValues);

    return usuario;
  }

  async create(value, options) {
    const res = await Usuario.create(value, options);

    if (!res) {
      throw new GenericError('erro ao gravar novo usuario', {}, { status: 500, error_dbcreate: res });
    }

    const novoUsuario = UsuarioEntity.fromModel(await res.dataValues);

    return novoUsuario;
  }
}

export default new UsuarioRepo();
