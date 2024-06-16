import bcryptjs from 'bcryptjs';

class UsuarioEntity {
  constructor(usuario) {
    if (usuario.id) this.id = usuario.id;
    this.nome = usuario.nome;

    if (usuario.senha) this.senha = usuario.senha;
    if (usuario.senha_hash) this.senha_hash = usuario.senha_hash;
    if (usuario.grupoId) this.grupoId = usuario.grupoId;
  }

  static parse(usuario) {
    const usuarioParse = { nome: usuario.nome, senha: usuario.senha, grupoId: usuario.grupoId };

    return new UsuarioEntity(usuarioParse);
  }

  static fromModel(usuarioModel) {
    try {
      if (!usuarioModel) return {};
      const usuarioParse = {
        id: usuarioModel.id,
        nome: usuarioModel.nome,
        grupoId: usuarioModel.grupo_id,
      };
      return new UsuarioEntity(usuarioParse);
    } catch (error) {
      console.log(error);
      return {};
    }
  }

  static fromModelLogin(usuarioModel) {
    const usuarioParse = {
      id: usuarioModel.id,
      nome: usuarioModel.nome,
      grupoId: usuarioModel.grupo_id,
      senha_hash: usuarioModel.senha_hash,
    };

    return new UsuarioEntity(usuarioParse);
  }

  async senhaIsValid(password) {
    return bcryptjs.compare(password, this.senha_hash);
  }
}

export default UsuarioEntity;
