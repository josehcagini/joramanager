import { StatusCodes } from 'http-status-codes';
import GenericError from '../error/GenericError.js';

import UsuarioRepo from '../repository/UsuarioRepo.js';
import UsuarioEntity from '../entity/UsuarioEntity.js';

class UsuarioController {
  static async validarNovoUsuario(novoUsuario) {
    if (!novoUsuario) {
      throw new GenericError('corpo da requisicao nao possui usuario', {}, { status: StatusCodes.BAD_REQUEST });
    }
    if (!novoUsuario.nome) {
      throw new GenericError('usuario nao possui nome', {}, { status: StatusCodes.BAD_REQUEST });
    }
    if (!novoUsuario.senha) {
      throw new GenericError('usuario nao possui senha', {}, { status: StatusCodes.BAD_REQUEST });
    }

    const usuarioExiste = await UsuarioRepo.findOne({ where: { nome: novoUsuario.nome } });

    if (usuarioExiste) {
      throw new GenericError('nome ja em uso', {}, { status: StatusCodes.CONFLICT });
    }

    if (novoUsuario.grupo_id) {
      // validar se tem foi passado grupo, validar se o grupo existe

      throw new GenericError('grupo nao existe ', {}, { status: StatusCodes.NOT_FOUND });
    }
  }

  async create(req, res) {
    try {
      const { usuario } = req.body;

      await UsuarioController.validarNovoUsuario(usuario);

      const usuarioSave = UsuarioEntity.parse(usuario);

      const novoUsuario = await UsuarioRepo.create(usuarioSave);

      const retjson = {
        novoUsuario: {
          id: novoUsuario.id,
          nome: novoUsuario.nome,
        },
        paths: {
          login: '/login',
        },
      };

      return res.status(StatusCodes.CREATED).json(retjson);
    } catch (error) {
      console.log(error);

      const status = error.status ? error.status : StatusCodes.INTERNAL_SERVER_ERROR;

      return res.status(status).json({
        error: {
          message: error.message,
          ...error,
        },
        paths: {
          home: '/',
        },
      });
    }
  }

  async show(req, res) {
    try {
      const { usuarioId } = req.params;

      console.log('usuario id:', req.params);

      if (!usuarioId) {
        throw new GenericError('request sem usuarioId', { status: StatusCodes.BAD_REQUEST });
      }

      const usuarios = await UsuarioRepo.findByPk(usuarioId);

      return res.status(StatusCodes.OK).json({ usuarios });
    } catch (error) {
      console.log(error);

      const status = error.status ? error.status : StatusCodes.INTERNAL_SERVER_ERROR;
      const retjson = {
        error: {
          message: error.message,
          ...error,
        },
        paths: {
          home: '/',
        },
      };
      return res.status(status).json(retjson);
    }
  }
}

export default new UsuarioController();
