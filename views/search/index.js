$('#btn-search').click(() => {
  const searchText = $('#search').val();

  getMovies(searchText);
});

/**
 * Faz uma requisição e mostra todos os filmes encontrados,
 * se não mostra uma mensagem de erro.
 * 
 * @param {string} searchText Nome do filme para ser buscado.
 */
function getMovies(searchText) {
  const url = constroiURLValida('https://www.omdbapi.com/', {
    apikey: '42d7f882',
    s: searchText,
  });

  $.ajax({
    url: url,
    type: 'get',
    dataType: "json",


    success: function (dados) {
      if(dados.Response == "False") {
        $('#movies').html("<h2 class='d-flex justify-content-center' id='msg-error'>Movie not found!</h2>")
      } else {
      console.log(dados);
      let movies = dados.Search;
      let output = '';
      $.each(movies, (index, movie) => {

        output += `
            <div class="col-md-3 movie-cards">
              <div class="well text-center movieInfo">                
                <img src="${movie.Poster}">                
                <h5 class="title">${movie.Title}</h5>
                <a onclick="movieSelected('${movie.imdbID}')" class="btn botao" href="#" data-bs-toggle="modal" data-bs-target="#modalResults">Movie Details</a>
              </div>
            </div>
            
          `
      });

      $('#movies').html(output);

    }
  }})
}

// Usuários.
UsuarioController.alteraPaginaQuandoDeslogaUsuario();
UsuarioController.alteraPaginaUsuarioLogado();
