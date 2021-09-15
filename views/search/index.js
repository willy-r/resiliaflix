let titulo = document.getElementById('search')
let results = document.getElementById('results')
let imgResultado = document.getElementById('imgResultado')
let info = document.getElementById('info')

$('#btn-search').on('click', ()=>{
    let url =  `http://www.omdbapi.com/?apikey=42d7f882&t=${titulo.value}`
    

    $.ajax({
        url: url,
        type: 'get',
        dataType: "json",

        success: function(dados) {
            imgResultado.setAttribute('src', `${dados.Poster}`)
            info.innerHTML = `Title : ${dados.Title} </br> Year: ${dados.Year} </br> Plot: ${dados.Plot} </br> Actors: ${dados.Actors} `
            console.log(dados.Poster)
        }
    })
})