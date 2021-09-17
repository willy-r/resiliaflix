/** Model do filme, manipula os dados do filme. */
class Filme {
  /**
   * Função estática para buscar um filme na API da url passada.
   * 
   * @param {string} url 
   * @param {Function} cbSucesso 
   * @param {Function} cbErro 
   */
  static buscaFilmeNaAPI(url, cbSucesso, cbErro) {
    const configs = {
      url: url,
      success: (dados) => {
        if (dados.Response === "False") {
          cbErro(dados);
          return;
        }

        // Pega alguns dados da resposta.
        const dadosDoFilme = [
          dados.imdbID,
          dados.Title,
          dados.Year,
          dados.Runtime,
          dados.Director, // Uma string separando os nomes dos diretores por vírgula.
          dados.Actors, // Uma string separando os nomes dos atores por vírgula.
          dados.Poster,
          dados.imdbRating,
        ];
        
        // Cria instância de Filme.
        const filme = new Filme(...dadosDoFilme);
        // Chama callback passando o objeto Filme como parâmetro.
        cbSucesso(filme);
      },
      error: cbErro,
    };

    // Usa ajax para fazer a requisição, welcome to callback hell.
    $.get(configs);
  }

  constructor(id, titulo, ano, duracao, direcao, elenco, img, avaliacao) {
    this.id = id;
    this.titulo = titulo;
    this.ano = ano;
    this.duracao = this._formataDuracao(duracao);
    this.direcao = direcao;
    this.elenco = elenco;
    this.img = img;
    this.avaliacao = avaliacao;
  }

  /**
   * Formata a duração do filme para o formato '0h 00min.'
   * 
   * @param {string} duracao
   * @returns {string}
   */
  _formataDuracao(duracao) {
    if (duracao === 'N/A')
      return duracao;
    
    const horasFracao = Number(duracao.split(' ')[0]) / 60;
    
    const horas = parseInt(horasFracao), // Transforma em horas.
          minutos = parseInt((horasFracao % 1) * 60), // Transforma em minutos.
          minutosFormatado = minutos.toString().padStart(2, '0');
    
    return `${horas}h ${minutosFormatado}min.`;
  }
}
