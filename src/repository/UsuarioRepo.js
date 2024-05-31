import { StatusCodes } from 'http-status-codes';
import Usuario from '../model/Usuario.js';
import GenericError from '../error/GenericError.js';
import UsuarioEntity from '../entity/UsuarioEntity.js';

class UsuarioRepo {
  async findOne(options) {
    try {
      const res = await Usuario.findOne(options);

      if (!res) {
        return res;
      }

      const usuario = res.toJSON();

      return usuario;
    } catch (error) {
      throw new GenericError(
        error.message,
        { status: error.status ? error.status : StatusCodes.INTERNAL_SERVER_ERROR },
      );
    }
  }

  async findByPk(usuarioId) {
    let usuario;

    try {
      const res = await Usuario.findByPk(usuarioId);
      if (!res) {
        return res;
      }
      usuario = UsuarioEntity.fromModel(res.toJSON());
    } catch (error) {
      throw new GenericError(
        error.message,
        { status: error.status ? error.status : StatusCodes.INTERNAL_SERVER_ERROR },
      );
    }

    return usuario;
  }

  async findAll() {
    try {
      const res = await Usuario.findAll();

      const usuarios = res.map((usuario) => UsuarioEntity.fromModel(usuario.toJSON()));

      return usuarios;
    } catch (error) {
      throw new GenericError(
        error.message,
        { status: error.status ? error.status : StatusCodes.INTERNAL_SERVER_ERROR },
      );
    }
  }

  async create(value, options) {
    const res = await Usuario.create(value, options);

    if (!res) {
      throw new GenericError('erro ao gravar novo usuario', { status: 500, error_dbcreate: res });
    }

    const novoUsuario = UsuarioEntity.fromModel(await res.dataValues);

    return novoUsuario;
  }

  async delete(usuarioId) {
    try {
      const usuario = await Usuario.findByPk(usuarioId);
      if (!usuario) {
        throw new GenericError('usuario nao existe', { status: StatusCodes.NOT_FOUND });
      }

      const usuarioDeletado = UsuarioEntity.fromModel(usuario.toJSON());
      await usuario.destroy();

      return usuarioDeletado;
    } catch (error) {
      throw new GenericError(
        error.message,
        { status: error.status ? error.status : StatusCodes.INTERNAL_SERVER_ERROR },
      );
    }
  }

  async update(usuarioId, values) {
    try {
      const usuario = await Usuario.findByPk(usuarioId);
      if (!usuario) {
        throw new GenericError('usuario nao existe', { status: StatusCodes.NOT_FOUND });
      }

      await usuario.update(values);
      const usuarioUpdated = UsuarioEntity.fromModel(usuario);

      return usuarioUpdated;
    } catch (error) {
      throw new GenericError(
        error.message,
        { status: error.status ? error.status : StatusCodes.INTERNAL_SERVER_ERROR },
      );
    }
  }
}

export default new UsuarioRepo();
