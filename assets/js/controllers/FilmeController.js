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
      FilmeView.insereCartaoNoCarrosel(cartao, carrosel);

      Filme.buscaFilmeNaAPI(url, (filmeObj) => {
        const view = new FilmeView(filmeObj);
        view.insereConteudoNoCartao(cartao);

        FilmeController._addListenerNaImagem($(cartao).children('.img-cartao'));

        // Verifica se foi o último filme, se sim, ativa tudo!
        if (i + 1 === idsFilmes.length)
          ativaCarroseis();
          ativaTooltips();
      });
    }
  }

  static _addListenerNaImagem(cartaoImg) {
    cartaoImg.click((event) => {
      if (Usuario.estaLogado()) {
        // Faz requisição pra pegar as infos do filme, e mostra no modal.
        console.log('Está logado, mostra modal!');
      } else {
        // Impede que o modal abra.
        event.stopPropagation();
        redirecionaParaPagina('views/login/');
      }
    });
  }
}
