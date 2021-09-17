$(document).ready(() => {
  $('#btn-search').on('click', (e) => {
    let searchText = $('#search').val();
    getMovies(searchText);

  });
});

function getMovies(searchText) {
  let url = `http://www.omdbapi.com/?apikey=42d7f882&s=${searchText}`

  $.ajax({
    url: url,
    type: 'get',
    dataType: "json",


    success: function (dados) {
      if(dados.Response == "False") {
        $('#movies').html("<h2 class='d-flex justify-content-center'>Movie not found!</h2>")
      } else {
      console.log(dados);
      let movies = dados.Search;
      let output = '';
      $.each(movies, (index, movie) => {

        output += `
            <div class="col-md-3">
              <div class="well text-center movieInfo">                
                <img src="${movie.Poster}">                
                <h5 class="title">${movie.Title}</h5>
                <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#" data-bs-toggle="modal" data-bs-target="#modalResults">Movie Details</a>
              </div>
            </div>
            
          `
      });

      $('#movies').html(output);

    }
  }})
}