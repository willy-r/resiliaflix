


setTimeout(function() {
  window.location.href = "../../index.html"
}, 10000)



function displayTimer(duration, display) {
  let timer = duration, minutes, seconds

  setInterval(function(){
    minutes = parseInt(timer / 60, 10)
    seconds = parseInt(timer % 60, 10)

    minutes = minutes < 10 ? "0" + minutes : minutes
    seconds = seconds < 10 ? "0" + seconds : seconds

    display.innerHTML = `${minutes}  :   ${seconds}`
    
    if (--timer < 0) {
      timer = duration
    }
  }, 1000)
}

window.onload = function() {
  let duration = 10
  let display = document.querySelector('#display')

  displayTimer(duration, display)
}