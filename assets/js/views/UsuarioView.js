class UsuarioView {
  /** Altera o header do usuário logado. */
  static headerUsuarioLogado() {
    $('#auth').hide('fast');
    $('#auth-logout').show('fast');
  }

  /** Altera o header do usuário deslogado. */
  static headerUsuarioDeslogado() {
    $('#auth-logout').hide('fast');
    $('#auth').show('fast');
  }
}
