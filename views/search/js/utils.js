function handleClickToOpenModal(elements, movieId) {
  elements.click(() => {
    if (Usuario.estaLogado())
      movieSelected(movieId);
    else
      redirecionaParaPagina('../login/');
  });
}

function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  getMovie();
}

function getMovie() {
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
      const movieObj = new Filme(...dadosDoFilme);

      let output = `
  <div class="modal-header" id="md-header">
    <h3 class="modal-title" id="movieName">${movie.Title}</h3>           
  </div>
  
  <div class="modal-body" id="md-body">

          <div id="image" class="d-flex justify-content-center" >
              <img id="imgResultado" src="${movie.Poster}">
          </div>

          <div id="dataMovie">
                  
              <strong class="titleInfo">Title:</strong> <spam class="moviesInfo">${movie.Title}</spam></br>
              <strong class="titleInfo">Year:</strong> <spam class="moviesInfo">${movie.Year}</spam></br>
              <strong class="titleInfo">Actors:</strong> <spam class="moviesInfo">${movie.Actors}</spam></br>
              <strong class="titleInfo">Plot:</strong> <spam class="moviesInfo">${movie.Plot}</spam>

          </div>            

  </div>
    
    <div class="modal-footer" id="md-footer">
      <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn botao">TRAILER</a>
      <button type="button" class="btn  btn-close" data-bs-dismiss="modal">close</button>
    </div>         
  `


      $('#info').html(output);
    }
  })
}

function showTextSearched(text) {
  $('#textSearched').attr('title', text).show('fast')
    .children('strong').text(text);
}
