class GrupoEntity {
  constructor(grupo) {
    this.id = grupo.id;
    this.nome = grupo.nome;
    this.permissoes = grupo.permissoes;
  }

  fromModel(grupoModel) {
    return new GrupoEntity(grupoModel);
  }
}

export default GrupoEntity;
