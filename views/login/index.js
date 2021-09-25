$('#form').submit((event) => {
  event.preventDefault();

  const email = $('#email').val(),
        senha = $('#senha').val();
  
  if (Usuario.verificaCadastro(email, senha)) {
    Usuario.logaUsuario();
    redirecionaParaPagina('../../');
  }

  $('#erro-login').show('fast');
  setTimeout(() => $('#erro-login').hide('fast'), 5000);
});

// Usuários.
UsuarioController.alteraPaginaQuandoDeslogaUsuario();
UsuarioController.alteraPaginaUsuarioLogado();
