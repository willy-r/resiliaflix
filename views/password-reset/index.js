const form = $('#form');

form.submit((event) => {
  event.preventDefault();

  if (form[0].checkValidity()) {
    form.addClass('was-validated');
    setTimeout(() => location.replace('../login/'), 3500);
  } else {
    form.addClass('was-validated');
    setTimeout(() => form.removeClass('was-validated'), 3000);
  }
});


// Usuários.
UsuarioController.alteraPaginaQuandoDeslogaUsuario();
UsuarioController.alteraPaginaUsuarioLogado();
