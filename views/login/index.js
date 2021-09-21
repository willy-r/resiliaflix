$('#form').submit((event) => {
  event.preventDefault();
  
  Usuario.logaUsuario();
  redirecionaParaPagina('../../');
})

// Usuários.
UsuarioController.alteraPaginaQuandoDeslogaUsuario();
UsuarioController.alteraPaginaUsuarioLogado();

$('#form1').submit(function (event) {
  event.preventDefault()
  $('#form1')[0].reset()
  $('#emailHelp').toggleClass('d-none')
  setTimeout(function(){location.replace('./') },3000) 
})
