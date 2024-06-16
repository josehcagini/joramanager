import { StatusCodes } from 'http-status-codes';
import GenericError from '../error/GenericError.js';
import GrupoRepo from '../repository/GrupoRepo.js';
import ModuloEnum from '../enum/ModuloEnum.js';
import TipoOperacaoEnum from '../enum/TipoOperacaoEnum.js';
import pagesEnum from '../enum/pagesEnum.js';
import acessosEnum, { isSelfEdit } from '../enum/acessosEnum.js';

class GrupoController {
  async hasAccess(tipoOperacao, modulo, grupoId) {
    try {
      const grupo = await GrupoRepo.findByPk(grupoId, true);

      if (!grupo) {
        throw new GenericError('grupo nao encontrado', { status: StatusCodes.NOT_FOUND });
      }

      // eslint-disable-next-line max-len
      const grupoPermissao = grupo.permissoes.filter((permissao) => modulo === permissao.modulo && tipoOperacao.includes(permissao.tipoOperacao) && (!permissao.bloqueado));
      return grupoPermissao;
    } catch (error) {
      throw new GenericError(
        error.message,
        { status: error.status ? error.status : StatusCodes.INTERNAL_SERVER_ERROR },
      );
    }
  }

  async exists(grupoId) {
    try {
      const grupo = await GrupoRepo.findByPk(grupoId);
      return !!grupo;
    } catch (error) {
      console.log('GrupoController.exists');
      console.log(error);
      return false;
    }
  }

  async getGrupoPadrao() {
    try {
      const whereDev = {
        where: {
          nome: 'dev',
        },
      };

      const grupo = await GrupoRepo.findOne(whereDev);

      return grupo.id;
    } catch (error) {
      console.log('GrupoController.getGrupoPadrao');
      console.log(error);
      throw new GenericError(
        error.message,
        { status: error.status ? error.status : StatusCodes.INTERNAL_SERVER_ERROR },
      );
    }
  }

  static async getAcessosGrupo(grupoId) {
    try {
      const grupoPermissoes = await GrupoRepo.findByPk(grupoId, true);

      const acessos = new Map();

      acessos.set(acessosEnum.REGISTRARUSUARIO, !!grupoPermissoes.permissoes.find((permissao) => (
        permissao.modulo === ModuloEnum.USUARIO
        && permissao.tipoOperacao === TipoOperacaoEnum.CREATE
        && !permissao.bloqueado
      )));

      acessos.set(acessosEnum.HOME, true);
      acessos.set(acessosEnum.LOGIN, true);
      acessos.set(acessosEnum.LOGOUT, true);
      acessos.set(acessosEnum.LISTARUSUARIO, !!grupoPermissoes.permissoes.find((permissao) => (
        permissao.modulo === ModuloEnum.USUARIO
        && permissao.tipoOperacao === TipoOperacaoEnum.RETRIEVEOTHERS
        && !permissao.bloqueado
      )));
      acessos.set(acessosEnum.EDITARRUSUARIO, !!grupoPermissoes.permissoes.find((permissao) => (
        permissao.modulo === ModuloEnum.USUARIO
        && permissao.tipoOperacao === TipoOperacaoEnum.UPDATEOTHERS
        && !permissao.bloqueado
      )));

      acessos.set(acessosEnum.EDITARRUSUARIOPROPRIO, !!grupoPermissoes.permissoes.find((permissao) => (
        permissao.modulo === ModuloEnum.USUARIO
        && permissao.tipoOperacao === TipoOperacaoEnum.UPDATESELF
        && !permissao.bloqueado
      )));

      return acessos;
    } catch (error) {
      console.log('GrupoController.getAcessosGrupo');
      console.log(error);
      throw new GenericError(
        error.message,
        { status: error.status ? error.status : StatusCodes.INTERNAL_SERVER_ERROR },
      );
    }
  }

  async getAcessoGrupoPage(req, res) {
    try {
      const { grupoId } = req.params;

      const grupoPermissoes = await GrupoController.getAcessosGrupo(grupoId);
      const pagePersmissoes = [...pagesEnum];

      const acesso = pagePersmissoes.map((page) => ({
        acessosEnum: page.acessosEnum,
        path: page.path,
        hasAccess: grupoPermissoes.get(page.acessosEnum),
        isRegEx: page.isRegEx,
        selfEdit: isSelfEdit(page.acessosEnum),
      }));

      const retjson = {
        acesso,
      };
      return res.status(StatusCodes.OK).json(retjson);
    } catch (error) {
      const status = GenericError.getStatusCode(error);
      const retjson = GenericError.getJsonError(error);
      return res.status(status).json(retjson);
    }
  }
}

export default new GrupoController();
