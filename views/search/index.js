$(document).ready(() => {
  $('#btn-search').on('click', (e) => {
    let searchText = $('#search').val();
    getMovies(searchText);

  });
});

function getMovies(searchText) {
  let url = `https://www.omdbapi.com/?apikey=42d7f882&s=${searchText}`

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
            <div class="card movie-cards" style="width:280px">
              <div class="well text-center movieInfo">                
                <img class="card-img-top"  alt="Card image" src="${movie.Poster}">                
                <div class="card-body">
                <h5 class="card-title titleInfo ">${movie.Title}</h5>
                <a onclick="movieSelected('${movie.imdbID}')" class="btn botao" href="#" data-bs-toggle="modal" data-bs-target="#modalResults">Movie Details</a>
                </div>
              </div>
            </div>
            
          `
      });

      $('#movies').html(output);

    }
  }})
}