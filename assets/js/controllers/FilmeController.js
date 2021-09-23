class FilmeController {
  /**
   * Mostra os filmes no carrosel, baseando-se numa lista de ids
   * de filmes passados. Ele mantém a ordem dos elementos da lista.
   * 
   * @param {string[]} idsFilmes
   * @param {HTMLDivElement} carrosel
   */
  static mostraFilmesNoCarrosel(idsFilmes, carrosel) {
    for (let i = 0; i < idsFilmes.length; i++) {
      const idDoFilme = idsFilmes[i];
      const url = constroiURLValida('https://www.omdbapi.com/', {
        apikey: '1ae9ffc1',
        i: idDoFilme,
      });

      // Cria e já insere o cartão que conterá as informações do filme.
      const cartao = FilmeView.criaCartaoFilme(idDoFilme);
      FilmeView.insereElemento(cartao, carrosel);

      Filme.buscaFilmeNaAPI(url, (filmeObj) => {
        const view = new FilmeView(filmeObj);
        view.insereConteudoNoCartao(cartao);

        FilmeController._trataCliqueNoCartao($(cartao).children('.img-cartao'), view);

        // Verifica se foi o último filme, se sim, ativa tudo!
        if (i + 1 === idsFilmes.length) {
          ativaCarrossel(carrosel);
          ativaTooltips();
        }
      });
    }
  }

  /**
   * Método interno para tratar o clique na imagem do cartão.
   * Se o usuário clicar e estiver logado, o modal aparecerá.
   * Se não, o usuário é redirecionado para a página de login.
   * 
   * @param {HTMLImageElement} cartaoImg
   * @param {FilmeView} filmeView
   */
  static _trataCliqueNoCartao(cartaoImg, filmeView) {
    cartaoImg.click(() => {
      if (Usuario.estaLogado()) {
        // Com a view atual, toda a informação do filme clicado também estará disponível
        // é só passar para o modal nesse caso e depois tratar o clique do botão que mostrará
        // o trailer, nesse caso será necessário fazer uma requisição para buscar o trailer.
        const modal = $('#info-filme-interface')[0],
              modalTrailer = $('#trailer-filme-modal')[0],
              interfaceModalTrailer = $('#trailer-filme-interface')[0];

        filmeView.insereConteudoNoModal(modal);

        if (filmeView.model.jaTemTrailer())
          FilmeController._trataCliqueBotaoTrailer(modalTrailer, interfaceModalTrailer, filmeView);
        else
          filmeView.model.buscaTrailerNoYT(
            () => FilmeController._trataCliqueBotaoTrailer(modalTrailer, interfaceModalTrailer, filmeView),
            () => filmeView.mostraErroTrailer(interfaceModalTrailer),
          );
      } else {
        redirecionaParaPagina('views/login/');
      }
    });
  }

  /**
   * Trata o clique no botão de ver trailer do modal.
   * Insere o trailer no modal e aplica lógica para parar o vídeo quando fechar modal.
   * 
   * @param {HTMLElement} modalTrailer
   * @param {HTMLElement} interfaceModalTrailer
   * @param {FilmeView} view
   */
  static _trataCliqueBotaoTrailer(modalTrailer, interfaceModalTrailer, view) {
    $('#ver-trailer').click(() => {
      view.insereTrailerNoModal(interfaceModalTrailer);
      paraVideoQuandoFechaModal(modalTrailer);
    });
  }
}
