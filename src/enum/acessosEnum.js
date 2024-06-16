const acessoEnum = {
  REGISTRARUSUARIO: 'registrarUsuario',
  LISTARUSUARIO: 'listarUsuario',
  EDITARRUSUARIO: 'editarUsuario',
  EDITARRUSUARIOPROPRIO: 'editarUsuarioProprio',
  HOME: 'home',
  LOGIN: 'login',
  LOGOUT: 'logout',
  REGISTRARATIVIDADE: 'registrarAtividade',
  LISTARATIVIDADE: 'listarAtividade',
  EDITARATIVIDADE: 'editarAtividade',
};

export function isSelfEdit(option) {
  return ([
    acessoEnum.EDITARRUSUARIOPROPRIO,
  ]
    .includes(option));
}

export default acessoEnum;
