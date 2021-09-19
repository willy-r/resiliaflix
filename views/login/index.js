$('#form').submit((event) => {
  event.preventDefault();
  
  Usuario.logaUsuario();
  redirecionaParaPagina('../../');
})

// Usuários.
UsuarioController.alteraPaginaQuandoDeslogaUsuario();
UsuarioController.alteraPaginaUsuarioLogado();
