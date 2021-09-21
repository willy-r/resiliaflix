$('#form').submit(function (event) {
    event.preventDefault()
    localStorage.setItem('estaLogado', 'true')
    location.replace('../../')
    

})
$('#form1').submit(function (event) {
    event.preventDefault()
    $('#form1')[0].reset()
    $('#emailHelp').toggleClass('d-none')
    setTimeout(function(){location.replace('./') },3000) 
})    




















