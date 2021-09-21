function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    getMovie()
    return;
}


function getMovie() {

    let movieId = sessionStorage.getItem('movieId');

    let url = `https://www.omdbapi.com/?apikey=42d7f882&i=${movieId}`


    $.ajax({
        url: url,
        type: 'get',
        dataType: "json",


        success: function (response) {
            console.log(response);
            let movie = response

            let output = `
        <div class="modal-header">
          <h3 class="modal-title" id="movieName">${movie.Title}</h3>           
        </div>
        
        <div class="modal-body" id="md-body">

                <div id="image" class="d-flex justify-content-center" >
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
        }
    })
}
