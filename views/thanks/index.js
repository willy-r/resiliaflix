const duracaoSegundos = 10;

setTimeout(() => {
  if (document.referrer) {
    const url = new URL(document.referrer);

    if (url.pathname.endsWith('/register/'))
      Usuario.logaUsuario();
  }

  redirecionaParaPagina('../../');
}, (duracaoSegundos + 1) * 1000);

mostraContador(duracaoSegundos);

// Usuários.
UsuarioController.alteraPaginaQuandoDeslogaUsuario();
UsuarioController.alteraPaginaUsuarioLogado();

/**
 * Mostra um contador de segundos na tela.
 * 
 * @param {number} duracao Duração do contador em segundos.
 */
function mostraContador(duracao) {
  let contador = duracao, segundos;

  setInterval(() => {
    segundos = parseInt(contador % 60, 10).toString().padStart(2, '0');

    $('#timer').html(`${segundos}`);
    
    if (--contador < 1)
      contador = duracao;
  }, 1000);
}
