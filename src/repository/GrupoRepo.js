import { StatusCodes } from 'http-status-codes';
import GenericError from '../error/GenericError.js';
import Grupo from '../model/Grupo.js';
import GrupoPermissao from '../model/GrupoPermissao.js';
import Permissao from '../model/Permissao.js';
import GrupoEntity from '../entity/GrupoEntity.js';

class GrupoRepo {
  async retrievePermissao(grupo) {
    try {
      const res = await GrupoPermissao.findAll({
        where: {
          grupo_id: grupo.id,
        },
      });

      const permissoes = res.map((permissao) => permissao.toJSON());

      permissoes.forEach(async (permissao) => {
        const resPermissao = await Permissao.findByPk(permissao.PermissaoId);
        console.log('permissao teste ', resPermissao);
        const permissaoDescr = resPermissao.toJSON();

        permissao.descricao = permissaoDescr.descricao;
        permissao.tipoOperacao = permissaoDescr.tipo_operacao;
        permissao.modulo = permissaoDescr.modulo;
      });

      grupo.permissoes = permissoes;
    } catch (error) {
      console.log(error);
      throw new GenericError(error.message, { status: StatusCodes.INTERNAL_SERVER_ERROR });
    }
  }

  async findByPk(grupoId) {
    let grupo;

    try {
      const res = await Grupo.findByPk(grupoId);
      if (!res) {
        return res;
      }
      grupo = GrupoEntity.fromModel(res.toJSON());
      await this.retrievePermissao(grupo);
    } catch (error) {
      console.log(error);
      throw new GenericError(
        error.message,
        { status: error.status ? error.status : StatusCodes.INTERNAL_SERVER_ERROR },
      );
    }

    return grupo;
  }
}

export default new GrupoRepo();
