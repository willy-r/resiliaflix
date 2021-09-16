$(document).ready(() => {
    $('#btn-search').on('click', (e) => {
      let searchText = $('#search').val();
      getMovies(searchText);
      
    });
  });
  
  function getMovies(searchText){
    axios.get('http://www.omdbapi.com/?apikey=42d7f882&s='+searchText)
      .then((response) => {
        console.log(response);
        let movies = response.data.Search;
        let output = '';
        $.each(movies, (index, movie) => {
          output += `
            <div class="col-md-3">
              <div class="well text-center">
                <img src="${movie.Poster}">
                <h5>${movie.Title}</h5>
                <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#" data-bs-toggle="modal" data-bs-target="#modalResults">Movie Details</a>
              </div>
            </div>
          `;
        });
  
        $('#movies').html(output);
      })
      .catch((err) => {
        console.log(err);
      });
  }




    function movieSelected(id){
        sessionStorage.setItem('movieId', id);
        getMovie()
        return ;
      }
      
      function getMovie(){
        let movieId = sessionStorage.getItem('movieId');
      
        axios.get('http://www.omdbapi.com/?apikey=42d7f882&i='+movieId)
          .then((response) => {
            console.log(response);
            let movie = response.data;
      
            let output = `
            <div class="modal-header">
              <h3 class="modal-title" id="movieName">${movie.Title}</h3>           
            </div>
            
            <div class="modal-body" id="md-body">

                    <div id="image">
                        <img id="imgResultado" src="${movie.Poster}">
                    </div>

                    <div id="dataMovie">
                            
                        <strong class="titleInfo">Title:</strong> ${movie.Title}</br>
                        <strong class="titleInfo">Year:</strong> ${movie.Year}</br>
                        <strong class="titleInfo">Actors:</strong> ${movie.Actors}</br>
                        <strong class="titleInfo">Plot:</strong> ${movie.Plot}

                    </div>            

            </div>
              
              <div class="modal-footer">
                <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">TRAILER</a>
                <button type="button" class="btn  btn-danger" data-bs-dismiss="modal">close</button>
              </div>         
            `          

      
            $('#info').html(output);
          })
          .catch((err) => {
            console.log(err);
          });
      }
 
