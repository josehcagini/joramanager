class AtividadeEntity {
    constructor(atividade) {
        if (atividade.id) this.id = atividade.id;
        this.titulo = atividade.titulo;
        this.descricao = atividade.descricao;
        this.dtEntrega = atividade.dtEntrega;
        if (atividade.usuario_id) this.usuario_id = atividade.usuario_id;
        if (atividade.atividade_filha_id) this.atividade_filha_id = atividade.atividade_filha_id;
    }

    static parse(atividade) {
        const atividadeParse = {
            titulo: atividade.titulo,
            descricao: atividade.descricao,
            dtEntrega: atividade.dtEntrega,
            usuario_id: atividade.usuario_id,
            atividade_filha_id: atividade.atividade_filha_id
        };

        return new AtividadeEntity(atividadeParse);
    }

    static fromModel(atividadeModel) {
        const atividadeParse = {
            id: atividadeModel.id,
            titulo: atividadeModel.titulo,
            descricao: atividadeModel.descricao,
            dtEntrega: atividadeModel.dtEntrega,
            usuario_id: atividadeModel.usuario_id,
            atividade_filha_id: atividadeModel.atividade_filha_id,
        };

        return new AtividadeEntity(atividadeParse);
    }
}

export default AtividadeEntity;