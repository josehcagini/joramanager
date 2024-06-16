const acessoEnum = {
  REGISTRARUSUARIO: 'registrarUsuario',
  LISTARUSUARIO: 'listarUsuario',
  EDITARRUSUARIO: 'editarUsuario',
  EDITARRUSUARIOPROPRIO: 'editarUsuarioProprio',
  HOME: 'home',
  LOGIN: 'login',
  LOGOUT: 'logout',
};

export function isSelfEdit(option) {
  return ([
    acessoEnum.EDITARRUSUARIOPROPRIO,
  ]
    .includes(option));
}

export default acessoEnum;
