import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import GenericError from '../error/GenericError.js';
import UsuarioRepo from '../repository/UsuarioRepo.js';
import UsuarioEntity from '../entity/UsuarioEntity.js';

async function AuthToken(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new GenericError('login required', { status: StatusCodes.UNAUTHORIZED });
    }

    const [, token] = authorization.split(' ');

    const secretKey = process.env.TOKEN_SECRET;

    const dados = jwt.verify(token, secretKey);

    const usuario = UsuarioEntity.fromModel(await UsuarioRepo.findByPk(dados.id));

    if (!usuario) {
      throw new GenericError('usuario invalido', { status: StatusCodes.UNAUTHORIZED });
    }

    req.usuario = usuario;
    /*
    req.usuarioId = usuario.id;
    req.usuarioNome = usuario.nome;
    req.usuarioGrupo = usuario.grupo_id;
    */
    return next();
  } catch (error) {
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

export default AuthToken;
