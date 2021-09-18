class UsuarioController {
  /** 
   * Altera algumas coisas da página se o usuário estiver
   * logado, bom pra usar assim que a página for carregada.
   */
  static alteraPaginaUsuarioLogado() {
    if (Usuario.estaLogado())
      UsuarioView.headerUsuarioLogado();
  }

  /** Altera a página quando o usuário clica para deslogar-se. */
  static alteraPaginaQuandoDeslogaUsuario() {
    $('#auth-logout').click(() => {
      Usuario.deslogaUsuario();
      UsuarioView.headerUsuarioDeslogado();
    });
  }
}
