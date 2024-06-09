import StatusEnum from "../enum/StatusEnum";
import ArtefatoEntity from "./ArtefatoEntity";

class AtividadeEntity {
    constructor() {
        this.titulo = "";
        this.descricao = "";
        this.status = StatusEnum.PENDENTE;
        this.dtEntrega = null;
        this.atividade_pai_id = null;
        this.usuario_id = null;
        this.artefato = null;
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
        return this.dtEntrega;
    }

    setDtEntrega(dtEntrega) {
        this.dtEntrega = dtEntrega;
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
        return this.getArtefato;
    }

    setArtefato(artefato) {
        this.artefato = artefato;
    }

    toModel() {
        return {
            titulo: this.titulo,
            descricao: this.descricao,
            status: this.status,
            dtEntrega: this.dtEntrega,
            atividade_pai_id: this.atividade_pai_id,
            usuario_id: this.usuario_id,
            artefato: this.artefato
        }
    }

    toJson() {
        return {
            id: this.id,
            titulo: this.titulo,
            descricao: this.descricao,
            status: this.status,
            dtEntrega: this.dtEntrega,
            atividade_pai_id: this.atividade_pai_id,
            usuario_id: this.usuario_id,
            artefato: this.artefato
        }
    }

    static fromModel(atividade) {
        let atividadeEntity = new AtividadeEntity();
        
        atividadeEntity.setId(atividade.id);
        atividadeEntity.setTitulo(atividade.titulo);
        atividadeEntity.setDescricao(atividade.descricao);
        atividadeEntity.setStatus(atividade.status);
        atividadeEntity.setDtEntrega(atividade.dtEntrega);
        atividadeEntity.setAtividadePaiId(atividade.atividade_pai_id);
        atividadeEntity.setUsuarioId(atividade.usuario_id);
        atividadeEntity.setArtefato(atividade.artefato?.map((artefato) => ArtefatoEntity.fromModel(artefato)));

        return atividadeEntity
    }

    static fromJson(atividade) {
        let atividadeEntity = new AtividadeEntity();
        
        atividadeEntity.setTitulo(atividade.titulo);
        atividadeEntity.setDescricao(atividade.descricao);
        atividadeEntity.setStatus(atividade.status);
        atividadeEntity.setDtEntrega(atividade.dtEntrega);
        atividadeEntity.setAtividadePaiId(atividade.atividade_pai_id);
        atividadeEntity.setUsuarioId(atividade.usuario_id);
        atividadeEntity.setArtefato(atividade.artefato?.map((artefato) => ArtefatoEntity.fromModel(artefato)));

        return atividadeEntity
    }
}

export default AtividadeEntity;