// Filmes do grupo.
const filmesTop12 = [
  'tt0434409', 'tt0816692', 'tt0109830', 'tt2980516',
  'tt0120737', 'tt2911666', 'tt13380404', 'tt0457939',
  'tt4633694', 'tt4154796', 'tt0107688', 'tt0758752',
];

FilmeController.mostraFilmesNoCarrosel(filmesTop12, $('#top12')[0]);

setTimeout(() => {
  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 15,
    dots: false,
    slideBy: 'page',
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
  
  // Ativa todos os tooltips dos carrosséis.
  $('[data-bs-toggle="tooltip"]').tooltip();
}, 200);
