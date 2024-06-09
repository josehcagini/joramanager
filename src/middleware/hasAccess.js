import { StatusCodes } from 'http-status-codes';
import GenericError from '../error/GenericError.js';
import UsuarioController from '../controller/UsuarioController.js';

function hasAccess(tipoOperacao, modulo) {
  return async (req, res, next) => {
    try {
      const permissoes = await UsuarioController.hasAccess(tipoOperacao, modulo, req.usuario);

      if (permissoes.length > 0) {
        req.permissoes = permissoes;
        return next();
      }
      throw new GenericError('nao autorizado', {
        status: StatusCodes.UNAUTHORIZED,
        paths: {
          login: '/login',
        },
      });
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
  };
}

export default hasAccess;
