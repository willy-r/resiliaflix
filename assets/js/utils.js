/**
 * Monta uma URL válida com a url base passada e os parâmetros.
 * 
 * @param {string} urlBase
 * @param {{any: string}} params Um objeto contendo os parâmetros e seus valores.
 * @returns {string} Uma string representando a URL resultante.
 */
function constroiURLValida(urlBase, params) {
  const url = new URL(urlBase);

  for (let nomeParametro in params)
    url.searchParams.set(nomeParametro, params[nomeParametro]);
  
  return url.toString();
}

/** 
 * Ativa o carrosel atual.
 * 
 * @param {HTMLElement} carrosel Elemento do carrosel.
 */
function ativaCarrossel(carrosel) {
  $(carrosel).owlCarousel({
    loop: true,
    margin: 10,
    dots: false,
    slideBy: 3,
    mouseDrag: false,
    nav: true,
    navText: [
      '<span class="btn btn-outline-light bi bi-arrow-left-square-fill"></span>',
      '<span class="btn btn-outline-light bi bi-arrow-right-square-fill"></span>'
    ],
    responsive: {
      0: {
        items: 1,
        slideBy: 1,
        stagePadding: 40,
      },
      480: {
        items: 2,
        slideBy: 2,
        stagePadding: 20,
      },
      768: {
        items: 3,
        slideBy: 2,
      },
      992: {
        items: 4,
      },
      1200: {
        items: 5,
      }
    },
  });
}

/** Ativa todos os tooltips da página atual. */
function ativaTooltips() {
  $('[data-tooltip-toggle="tooltip"]').tooltip();
}

function paraVideoQuandoFechaModal(modal) {
  $(modal).on('hidden.bs.modal', () => {
    const iframe = $(modal).find('#trailer-filme');
    iframe.removeAttr('src');
  });
}

/**
 * Redirectiona para a página especificada.
 * NOTA: se atente a localização do HTML que está chamando esta função.
 * 
 * @param {string} pagina URL relativa da página.
 */
function redirecionaParaPagina(pagina) {
  location.replace(pagina);
}
