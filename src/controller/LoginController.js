import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import GenericError from '../error/GenericError.js';
import UsuarioRepo from '../repository/UsuarioRepo.js';
import UsuarioEntity from '../entity/UsuarioEntity.js';

class LoginController {
  static generateToken(usuario) {
    const payload = {
      id: usuario.id,
      nome: usuario.nome,
    };

    const secretKey = process.env.TOKEN_SECRET;
    const tokenExpiration = process.env.TOKEN_EXPIRATION;

    const token = jwt.sign(payload, secretKey, { expiresIn: tokenExpiration });
    return token;
  }

  async store(req, res) {
    try {
      const { nome, senha } = req.body;

      if (!nome || !senha) {
        throw new GenericError('credenciais invalidas', { status: StatusCodes.BAD_REQUEST });
      }

      const usuarioFind = await UsuarioRepo.findOne({ where: { nome } })
      if (!usuarioFind) {
        throw new GenericError('usuario nao encontrado', { status: StatusCodes.NOT_FOUND });
      }
      const usuario = UsuarioEntity.fromModelLogin(usuarioFind);
      

      if (!(await usuario.senhaIsValid(senha))) {
        throw new GenericError('senha incorreta', { status: StatusCodes.UNAUTHORIZED });
      }

      const token = LoginController.generateToken(usuario);

      const retjson = {
        token,
        paths: {
          home: '/',
        },
      };
      return res.status(StatusCodes.OK).json(retjson);
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

export default new LoginController();
