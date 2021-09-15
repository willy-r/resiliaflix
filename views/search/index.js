let titulo = document.getElementById('search')
let results = document.getElementById('results')
let imgResultado = document.getElementById('imgResultado')
let info = document.getElementById('info')
let erro = document.getElementById('erro')
let movieName = document.getElementById('movieName')

$('#btn-search').on('click', ()=>{
    let url =  `http://www.omdbapi.com/?apikey=42d7f882&t=${titulo.value}`
    

    $.ajax({
        url: url,
        type: 'get',
        dataType: "json",

        success: function(dados) {

               if(dados.Response == 'False') {
                    imgResultado.src = ""
                    info.innerHTML = ""
                    erro.innerHTML = "<h1>Movie not found!</h1>"
                }
                else {  
                        erro.innerHTML = ""
                        imgResultado.setAttribute('src', `${dados.Poster}`)
                        movieName.innerHTML = `${dados.Title}`
                        info.innerHTML = `<strong>Title:</strong> ${dados.Title} </br> <strong>Year:</strong> ${dados.Year} </br> <strong>Plot:</strong> ${dados.Plot} </br> <strong>Actors:</strong> ${dados.Actors} `
                        console.log(dados.Poster)
                        
                    }            
                }
            })
        })