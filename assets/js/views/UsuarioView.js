class UsuarioView {
  /** Altera o header do usuário logado. */
  static headerUsuarioLogado() {
    $('#auth').hide('fast');
    // Se ele está logado, ele tem conta.
    $('#nome-usuario').html(`
      <span class="navbar-text">
        Welcome, <strong class="text-light text-uppercase fw-bold" title="William Rodrigues">${Usuario.obtemNome()}</strong>!
      </span>
    `).show('fast');
    $('#auth-logout').show('fast');
  }

  /** Altera o header do usuário deslogado. */
  static headerUsuarioDeslogado() {
    $('#auth-logout').hide('fast');
    $('#nome-usuario').hide('fast');
    $('#auth').show('fast');
  }
}
