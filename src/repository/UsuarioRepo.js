import Usuario from '../model/Usuario.js';
import GenericError from '../Error/GenericError.js';

class UsuarioRepo {
  parse(usuario) {
    const usuarioParse = { nome: usuario.nome, senha: usuario.senha, grupo_id: usuario.grupo_id };

    return usuarioParse;
  }

  async findOne(options) {
    const res = await Usuario.findOne(options);

    if (!res) {
      return res;
    }

    const usuario = await res.dataValues;

    return usuario;
  }

  async create(value, options) {
    const res = await Usuario.create(value, options);

    if (!res) {
      throw new GenericError('erro ao gravar novo usuario', {}, { status: 500, error_dbcreate: res });
    }

    const novoUsuario = res.dataValues;

    return novoUsuario;
  }
}

export default new UsuarioRepo();
