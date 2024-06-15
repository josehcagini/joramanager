import StatusEnum from "../enum/StatusEnum.js";
import ArtefatoEntity from "./ArtefatoEntity.js";

class AtividadeEntity {
    constructor() {
        this.titulo = "";
        this.descricao = "";
        this.status = StatusEnum.PENDENTE;
        this.dtentrega = null;
        this.atividade_pai_id = null;
        this.usuario_id = null;
        this.artefato = [];
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getTitulo() {
        return this.titulo;
    }

    setTitulo(titulo) {
        this.titulo = titulo;
    }

    getDescricao() {
        return this.descricao;
    }

    setDescricao(descricao) {
        this.descricao = descricao;
    }

    getStatus() {
        return this.status;
    }

    setStatus(status) {
        this.status = status;
    }

    getDtEntrega() {
        return this.dtentrega;
    }

    setDtEntrega(dtentrega) {
        this.dtentrega = dtentrega;
    }

    getUsuarioId() {
        return this.usuario_id;
    }

    setUsuarioId(usuario_id) {
        this.usuario_id = usuario_id;
    }

    getAtividadePaiId() {
        return this.atividade_pai_id;
    }

    setAtividadePaiId(atividade_pai_id) {
        this.atividade_pai_id = atividade_pai_id;
    }

    getArtefato() {
        return this.artefato;
    }

    setArtefato(artefato) {
        this.artefato = artefato;
    }

    toModel() {
        return {
            titulo: this.titulo,
            descricao: this.descricao,
            status: this.status,
            dtentrega: this.dtentrega,
            atividade_pai_id: this.atividade_pai_id,
            usuario_id: this.usuario_id,
            artefato: this.artefato.map((artefato) => artefato.toModel())
        };
    }

    toJson() {
        return {
            id: this.id,
            titulo: this.titulo,
            descricao: this.descricao,
            status: this.status,
            dtentrega: this.dtentrega,
            atividade_pai_id: this.atividade_pai_id,
            usuario_id: this.usuario_id,
            artefato: this.artefato.map((artefato) => artefato.toJson())
        };
    }

    static fromModel(atividade) {
        let atividadeEntity = new AtividadeEntity();
        
        atividadeEntity.setId(atividade.id);
        atividadeEntity.setTitulo(atividade.titulo);
        atividadeEntity.setDescricao(atividade.descricao);
        atividadeEntity.setStatus(atividade.status);
        atividadeEntity.setDtEntrega(atividade.dtentrega);
        atividadeEntity.setAtividadePaiId(atividade.atividade_pai_id);
        atividadeEntity.setUsuarioId(atividade.usuario_id);
        atividadeEntity.setArtefato(atividade.artefato?.map((artefato) => ArtefatoEntity.fromModel(artefato)));

        return atividadeEntity;
    }

    static fromJson(atividade) {
        let atividadeEntity = new AtividadeEntity();
        
        atividadeEntity.setTitulo(atividade.titulo);
        atividadeEntity.setDescricao(atividade.descricao);
        atividadeEntity.setStatus(atividade.status);
        atividadeEntity.setDtEntrega(atividade.dtentrega);
        atividadeEntity.setAtividadePaiId(atividade.atividade_pai_id);
        atividadeEntity.setUsuarioId(atividade.usuario_id);
        
        if (atividade.artefato) {
            atividadeEntity.setArtefato(atividade.artefato.map((artefato) => ArtefatoEntity.fromJson(artefato)));
        } else {
            atividadeEntity.setArtefato([]);
        }

        return atividadeEntity;
    }
}

export default AtividadeEntity;