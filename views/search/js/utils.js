/**
 * Lida com os cliques para abrir o modal e salva o Id do filme clicado.
 * Se o usuário estiver logado o filme é mostrado, se não ele é redirecionado
 * para a página de login.
 * 
 * @param {*} elements 
 * @param {*} movieId 
 */
function handleClickToOpenModal(elements, movieId) {
  elements.click(() => {
    if (Usuario.estaLogado())
      movieSelected(movieId);
    else
      redirecionaParaPagina('../login/');
  });
}

/**
 * Salva na sessionStorage o id do filme para posteriormente
 * fazer a requisição na API e pegar as infos dele.
 * 
 * @param {string} id 
 */
function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  showMovieInfo();
}

/** Mostra as informações do filme clicado. */
function showMovieInfo() {
  const movieId = sessionStorage.getItem('movieId');
        url = constroiURLValida('https://www.omdbapi.com/', {
          apikey: '42d7f882',
          i: movieId,
        });

  $.get({
    url: url,
    success: (data) => {
      const movie = [
        data.imdbID,
        data.Title,
        data.Plot,
        data.Year,
        data.Runtime,
        data.Director, // Uma string separando os nomes dos diretores por vírgula.
        data.Actors, // Uma string separando os nomes dos atores por vírgula.
        data.Poster,
        data.imdbRating,
      ];
      
      // Cria instância de Filme.
      const movieObj = new Filme(...movie),
            movieView = new FilmeView(movieObj);
      
      const modal = $('#movieModalInterface'),
            modalTrailer = $('#trailer-filme-modal');
            modalTrailerInterface = $('#trailerFilmeInterface');

      // Insere conteúdo do filme no modal.
      movieView.insereConteudoNoModal(modal);

      // Trata clique no botão do trailer.
      $('#ver-trailer').click(() => {
        // Isso trata parcialmente a redução de requisições na API do YT.
        // @TODO melhorar lógica para não ter que sempre fazer uma requisição
        // quando clicar para ver as informações do filme.
        // Uma boa seria já armazenar as informações de todos os filmes que foram
        // encontrados.
        if (movieObj.jaTemTrailer()) {
          movieView.insereTrailerNoModal(modalTrailerInterface);
          paraVideoQuandoFechaModal(modalTrailer);
        } else {
          movieObj.buscaTrailerNoYT(
            // Requisição deu certo.
            () => {
              movieView.insereTrailerNoModal(modalTrailerInterface);
              paraVideoQuandoFechaModal(modalTrailer);
            },
            // Requisição deu errado.
            () => movieView.mostraErroTrailer(modalTrailerInterface),
          );
        }
      });
    }
  });
}

/**
 * Mostra o que o usuário digitou para chegar naqueles filmes.
 * 
 * @param {string} text 
 */
function showTextSearched(text) {
  $('#textSearched').attr('title', text).show('fast')
    .children('strong').text(text);
}
