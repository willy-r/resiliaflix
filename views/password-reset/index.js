$('#form').submit((event) => {
  event.preventDefault();

  const email = $('#email').val();

  if (Usuario.emailExiste(email)) {
    $('#sucesso-email').show('slow');
    setTimeout(() => redirecionaParaPagina('../login/'), 3500);
  } else {
    $('#erro-email').show('fast');
    setTimeout(() => $('#erro-email').hide('fast'), 3500);
  }
});

// Usuários.
UsuarioController.alteraPaginaQuandoDeslogaUsuario();
UsuarioController.alteraPaginaUsuarioLogado();
