class ArtefatoEntity {
    constructor() {
        this.titulo = "";
        this.descricao = "";
        this.originalname = "";
        this.filename = "";
        this.url = null;
        this.atividade_id = null;
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

    getOriginalname() {
        return this.originalname;
    }

    setOriginalName(originalname) {
        this.originalname = originalname;
    }

    getFilename() {
        return this.filename;
    }

    setFileName(filename) {
        this.filename = filename;
    }

    getUrl() {
        return this.url;
    }

    setUrl(url) {
        this.url = url;
    }

    getAtividadeId() {
        return this.atividade_id;
    }

    setAtividadeId(atividade_id) {
        this.atividade_id = atividade_id;
    }

    toModel() {
        return {
            titulo: this.titulo,
            descricao: this.descricao,
            originalname: this.originalname,
            filename: this.filename,
            url: this.url,
            atividade_id: this.atividade_id
        }
    }

    toJson() {
        return {
            id: this.id,
            titulo: this.titulo,
            descricao: this.descricao,
            originalname: this.originalname,
            filename: this.filename,
            url: this.url,
            atividade_id: this.atividade_id
        }
    }

    static fromModel(artefato) {
        let artefatoEntity = new ArtefatoEntity();
        
        artefatoEntity.setId(artefato.id);
        artefatoEntity.setTitulo(artefato.titulo);
        artefatoEntity.setDescricao(artefato.descricao);
        artefatoEntity.setOriginalName(artefato.originalname);
        artefatoEntity.setFileName(artefato.filename);
        artefatoEntity.setUrl(artefato.url);
        artefatoEntity.setAtividadeId(artefato.atividade_id);

        return artefatoEntity
    }

    static fromJson(artefato) {
        let artefatoEntity = new ArtefatoEntity();
        
        artefatoEntity.setTitulo(artefato.titulo);
        artefatoEntity.setDescricao(artefato.descricao);
        artefatoEntity.setOriginalName(artefato.originalname);
        artefatoEntity.setFileName(artefato.filename);
        artefatoEntity.setUrl(artefato.url);
        artefatoEntity.setAtividadeId(artefato.atividade_id);

        return artefatoEntity
    }
}

export default ArtefatoEntity;