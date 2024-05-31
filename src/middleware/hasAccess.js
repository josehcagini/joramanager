import { StatusCodes } from 'http-status-codes';
import GenericError from '../error/GenericError.js';
import UsuarioController from '../controller/UsuarioController.js';

function hasAccess(tipoOperacao) {
  return async (req, res, next) => {
    try {
      if ((await UsuarioController.hasAccess(tipoOperacao, req.usuario))) {
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
