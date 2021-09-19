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
      const url = constroiURLValida('http://www.omdbapi.com/', {
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
          ativaCarroseis();
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
    cartaoImg.click((event) => {
      if (Usuario.estaLogado()) {
        // Com a view atual, toda a informação do filme clicado também estará disponível
        // é só passar para o modal nesse caso e depois tratar o clique do botão que mostrará
        // o trailer, nesse caso será necessário fazer uma requisição para buscar o trailer.
        const modal = $('#info-filme-interface')[0],
              trailerModal = $('#trailer-filme-modal')[0],
              trailerModalInterface = $('#trailer-filme-interface')[0];

        filmeView.insereConteudoNoModal(modal);

        if (filmeView.model.jaTemTrailer()) {
          console.log('Já tem trailer');
          $('#ver-trailer').click(() => {
            filmeView.insereTrailerNoModal(trailerModalInterface);
            paraVideoQuandoFechaModal(trailerModal);
          });
        } else {
          filmeView.model.buscaTrailerNoYT(() => {
            $('#ver-trailer').click(() => {
              console.log('Cliquei');
              filmeView.insereTrailerNoModal(trailerModalInterface);
              paraVideoQuandoFechaModal(trailerModal);
            });
          });
        }
      } else {
        // Impede que o modal abra.
        event.stopPropagation();
        redirecionaParaPagina('views/login/');
      }
    });
  }
}
