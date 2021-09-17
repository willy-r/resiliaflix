// Ações que são ativadas após o carregamento do DOM.
$(() => {
  // Ativa todos os tooltips dos carrosséis.
  $('[data-bs-toggle="tooltip"]').tooltip();
});

// Ativa todos os carrosséis.
$('.owl-carousel').owlCarousel({
  loop: true,
  margin: 15,
  dots: false,
  nav: true,
  navText: [
    '<span class="btn btn-outline-light bi bi-arrow-left-square-fill"></span>',
    '<span class="btn btn-outline-light bi bi-arrow-right-square-fill"></span>'
  ],
  responsive: {
    0: {
      items: 1,
      stagePadding: 40,
    },
    480: {
      items: 2,
      stagePadding: 20,
    },
    768: {
      items: 3,
    },
    992: {
      items: 4,
    },
    1200: {
      items: 5,
    }
  },
});
