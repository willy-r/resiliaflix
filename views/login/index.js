$('#form').submit(function (event) {
    event.preventDefault()
    localStorage.setItem('estaLogado', 'true')
    $('#form')[0].reset()
})
