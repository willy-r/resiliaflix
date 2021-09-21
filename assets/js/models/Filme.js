/** Model do filme, manipula os dados do filme. */
class Filme {
  /**
   * Função estática para buscar um filme na API da url passada.
   * 
   * @param {string} url URL para fazer a requisição.
   * @param {Function} cbSucesso Callback passado para usar os dados do filme.
   * @param {Function} cbErro Callback para tratar erro na requisição.
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
          dados.Plot,
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
    };

    // Usa ajax para fazer a requisição, welcome to callback hell.
    $.get(configs);
  }

  constructor(id, titulo, sinopse, ano, duracao, direcao, elenco, img, avaliacao) {
    this._id = id;
    this.titulo = titulo;
    this.sinopse = sinopse;
    this.ano = ano;
    this.duracao = this._formataDuracao(duracao);
    this.direcao = direcao;
    this.elenco = elenco;
    this.img = img;
    this.avaliacao = avaliacao;
    this._trailer = null;
  }

  get id() {
    return this._id;
  }

  get trailer() {
    return this._trailer;
  }

  set trailer(novoTrailer) {
    this._trailer = novoTrailer;
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

  /**
   * Busca o trailer no YouTube do filme instânciado.
   * 
   * @param {Function} cbSucesso Callback para usar a URL do trailer.
   * @param {Function} cbErro Callback para tratar erro na requisição.
   */
  buscaTrailerNoYT(cbSucesso, cbErro) {
    // 100 requisições por dia.
    const url = constroiURLValida('https://www.googleapis.com/youtube/v3/search', {
      key: 'AIzaSyAwTIb2IGTSb-859pULEu8kkY5OSCqXDog',
      type: 'video',
      q: `${this.titulo} original trailer`,
    });
    
    const configs = {
      url: url,
      success: (dados) => {
        // Pega o ID do primeiro vídeo.
        const idTrailer = dados.items[0].id.videoId,
              urlTrailer = constroiURLValida(`https://www.youtube-nocookie.com/embed/${idTrailer}`, {
                autoplay: '1',
              });
        
        // Passa a url do trailer pro filme.
        this.trailer = urlTrailer;
        // Chama callback passando a URL do trailer como argumento (pra fazer algo a mais se quiser).
        cbSucesso(urlTrailer);
      },
      error: cbErro,
    };

    // Callback hell de novo, welcome.
    $.get(configs);
  }

  /** Verifica se o filme já tem trailer, se sim retorna true. */
  jaTemTrailer() {
    return this.trailer !== null;
  }
}
