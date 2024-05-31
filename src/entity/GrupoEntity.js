class GrupoEntity {
  constructor(grupo) {
    this.id = grupo.id;
    this.nome = grupo.nome;
    this.permissoes = grupo.permissoes;
  }

  static fromModel(grupoModel) {
    return new GrupoEntity(grupoModel);
  }
}

export default GrupoEntity;
