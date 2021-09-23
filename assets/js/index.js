// Filmes do grupo.
const filmesTop12 = [
  'tt0434409', 'tt0816692', 'tt0109830', 'tt2980516',
  'tt0120737', 'tt2911666', 'tt13380404', 'tt0457939',
  'tt4633694', 'tt4154796', 'tt0107688', 'tt0758752',
];
const filmesRecentes = [
  'tt6334354', 'tt9376612', 'tt6264654', 'tt8332922', 'tt3554046',
  'tt2582802', 'tt6751668', 'tt4154756', 'tt0903624', 'tt1375666',
];
const filmesRecomendados = [
  'tt0468569', 'tt0133093', 'tt0080684', 'tt0088763',
  'tt1706620', 'tt0068646', 'tt0137523', 'tt0120815',
  'tt0110413', 'tt0266697', 'tt0110912', 'tt1853728',
  'tt0027977', 'tt0032553', 'tt0910970', 'tt0110357',
];

// Filmes.
FilmeController.mostraFilmesNoCarrosel(filmesTop12, $('#top12')[0]);
FilmeController.mostraFilmesNoCarrosel(filmesRecentes, $('#filmes-recentes')[0]);
FilmeController.mostraFilmesNoCarrosel(filmesRecomendados, $('#filmes-recomendados')[0]);

// Usuários.
UsuarioController.alteraPaginaQuandoDeslogaUsuario();
UsuarioController.alteraPaginaUsuarioLogado();

// Interações com a página.
trataCliqueBotaoPrecos();
