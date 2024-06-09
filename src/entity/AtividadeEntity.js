class AtividadeEntity {
    constructor(atividade) {
        if (atividade.id) this.id = atividade.id;
        this.titulo = atividade.titulo;
        this.descricao = atividade.descricao;
        this.status = atividade.status;
        this.dtEntrega = atividade.dtEntrega;
        if (atividade.usuario_id) this.usuario_id = atividade.usuario_id;
        if (atividade.atividade_pai_id) this.atividade_pai_id = atividade.atividade_pai_id;
    }

    static parse(atividade) {
        const atividadeParse = {
            titulo: atividade.titulo,
            descricao: atividade.descricao,
            status: atividade.status,
            dtEntrega: atividade.dtEntrega,
            usuario_id: atividade.usuario_id,
            atividade_pai_id: atividade.atividade_pai_id
        };

        return new AtividadeEntity(atividadeParse);
    }

    static fromModel(atividadeModel) {
        const atividadeParse = {
            id: atividadeModel.id,
            titulo: atividadeModel.titulo,
            descricao: atividadeModel.descricao,
            status: atividade.status,
            dtEntrega: atividadeModel.dtEntrega,
            usuario_id: atividadeModel.usuario_id,
            atividade_pai_id: atividadeModel.atividade_pai_id,
        };

        return new AtividadeEntity(atividadeParse);
    }
}

export default AtividadeEntity;