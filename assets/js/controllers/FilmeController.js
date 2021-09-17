class FilmeController {
  /**
   * 
   * @param {string[]} idsFilmes
   * @param {HTMLDivElement} carrosel
   */
  static mostraFilmesNoCarrosel(idsFilmes, carrosel) {
    for (let i = 0; i < idsFilmes.length; i++) {
      const url = constroiURLValida('http://www.omdbapi.com/', {
        apikey: '1ae9ffc1',
        i: idsFilmes[i],
      });

      Filme.buscaFilmeNaAPI(url, (filmeObj) => {
        const view = new FilmeView(filmeObj),
              cartao = view.criaCartaoFilme();
        view.insereCartaoNoCarrosel(cartao, carrosel);
      }, (dados) => console.log(dados.Error));
    }
  }
}
