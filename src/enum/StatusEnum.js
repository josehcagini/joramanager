class StatusEnum {
    constructor(code) {
        this.code = code;
    }

    static fromCode(code) {
        return Object.values(StatusEnum).find(status => status.code === code);
    }

    static isValidCode(code) {
        return Object.values(StatusEnum).some(status => status.code === code);
    }
}

StatusEnum.PENDENTE = new StatusEnum(0);
StatusEnum.ANDAMENTO = new StatusEnum(1);
StatusEnum.TESTANDO = new StatusEnum(2);
StatusEnum.PRONTO = new StatusEnum(3);

Object.freeze(StatusEnum);

export default StatusEnum;