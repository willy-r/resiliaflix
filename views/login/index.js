$('#form').submit((event) => {
  event.preventDefault();
  
  Usuario.logaUsuario();
  redirecionaParaPagina('../../');
})
