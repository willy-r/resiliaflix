$('#form').submit((event) => {
  event.preventDefault();

  getMovies($('#movie-name').val());

  event.target.reset();
});

// Usuários.
UsuarioController.alteraPaginaQuandoDeslogaUsuario();
UsuarioController.alteraPaginaUsuarioLogado();

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

  $.get({
    url: url,
    success: (dados) => {
      if(dados.Response == "False") {
        $('.invalid-feedback').first().show();
        setTimeout(() => $('.invalid-feedback').first().hide(), 3500);
      } else {
        // Reseta a pesquisa de antes.
        $('#movies').html('');
        // Mostra título do que foi pesquisado.
        showTextSearched(searchText);
        
        dados.Search.forEach((movie) => {
          const card = document.createElement('article');
          card.className = 'card text-light p-3 box';
          card.innerHTML = `             
            <img class="card-img-top card-img" src="${movie.Poster === 'N/A' ? '../../assets/images/movie-not-found.png' : movie.Poster}" alt="Poster of the movie ${movie.Title}"  data-bs-toggle="modal" data-bs-target="#movieModal" title="${movie.Title}">              
            <main class="card-body px-0 py-2">
              <h3 class="card-title m-0 text-truncate fs-5 fs-md-6 ff-roboto" title="${movie.Title}">
                ${movie.Title}
              </h3>
            </main>
            <footer class="d-flex justify-content-center flex-column card-footer border-light bg-transparent px-1">
              <p class="mb-2 text-center">
                <span class="bi bi-calendar-event me-1 clr-primaria"></span> ${movie.Year}
              </p>
              <button class="btn botao" data-bs-toggle="modal" data-bs-target="#movieModal">
                Movie details <span class="bi bi-eye"></span>
              </button>
            </footer>
          `;

          // Coloca evento de clique na imagem e no botão para verificar se está logado.
          handleClickToOpenModal($(card).find('[data-bs-target="#movieModal"]'), movie.imdbID);

          const cardWrapper = document.createElement('div');
          cardWrapper.className = 'col';
          
          cardWrapper.appendChild(card);

          $('#movies').append(cardWrapper);
        });
      }
    }
  });
}
