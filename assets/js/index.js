// Filmes do grupo.
const filmesTop12 = [
  'tt0434409', 'tt0816692', 'tt0109830', 'tt2980516',
  'tt0120737', 'tt2911666', 'tt13380404', 'tt0457939',
  'tt4633694', 'tt4154796', 'tt0107688', 'tt0758752',
];

// Filmes.
FilmeController.mostraFilmesNoCarrosel(filmesTop12, $('#top12')[0]);

// Usuários.
UsuarioController.alteraPaginaQuandoDeslogaUsuario();
UsuarioController.alteraPaginaUsuarioLogado();
