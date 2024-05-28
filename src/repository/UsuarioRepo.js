import { StatusCodes } from 'http-status-codes';
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

  async findByPk(usuarioId) {
    let usuario;

    try {
      const res = await Usuario.findByPk(usuarioId);
      usuario = UsuarioEntity.fromModel(await res.dataValues);
    } catch (error) {
      throw new GenericError(
        error.message,
        { status: error.status ? error.status : StatusCodes.INTERNAL_SERVER_ERROR },
      );
    }

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
