import { StatusCodes } from 'http-status-codes';
import GenericError from '../Error/GenericError.js';

import UsuarioRepo from '../repository/UsuarioRepo.js';

class UsuarioController {
  static async validarNovoUsuario(novoUsuario) {
    if (!novoUsuario) {
      throw new GenericError('corpo da requisicao nao possui usuario', {}, { status: 400 });
    }
    if (!novoUsuario.nome) {
      throw new GenericError('usuario nao possui nome', {}, { status: 400 });
    }
    if (!novoUsuario.senha) {
      throw new GenericError('usuario nao possui senha', {}, { status: 400 });
    }

    const usuarioExiste = await UsuarioRepo.findOne({ where: { nome: novoUsuario.nome } });

    if (usuarioExiste) {
      throw new GenericError('nome ja em uso', {}, { status: 409 });
    }

    if (novoUsuario.grupo_id) {
      // validar se tem foi passado grupo, validar se o grupo existe

      throw new GenericError('grupo nao existe ', {}, { status: 404 });
    }
  }

  async create(req, res) {
    try {
      const { usuario } = req.body;

      await UsuarioController.validarNovoUsuario(usuario);

      const usuarioSave = UsuarioRepo.parse(usuario);

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
}

export default new UsuarioController();
