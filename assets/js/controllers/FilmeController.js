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
        // Inserse o conteúdo no cartão certo que já está criado no DOM.
        view.insereConteudoNoCartao(cartao);
        
        cartao.querySelector('.img-cartao').addEventListener('click', () => console.log('Cliquei!')); // @TODO
      }, (dados) => console.log(dados.Error));
    }
  }
}
