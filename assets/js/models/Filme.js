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
      success: (dadosDoFilme) => {
        // Pega alguns dados da resposta.
        const dados = [
          dadosDoFilme.Title,
          dadosDoFilme.Year,
          dadosDoFilme.Runtime,
          dadosDoFilme.Director,
          dadosDoFilme.Actors, // Uma string separando os nomes dos atores por vírgula.
          dadosDoFilme.Poster,
          dadosDoFilme.Ratings, // Uma lista de diferentes sites de avaliação.
        ];
        
        // Cria instância de Filme.
        const filme = new Filme(...dados);
        // Chama callback passando o objeto como parâmetro.
        cbSucesso(filme);
      },
    };

    if (cbErro)
      configs['error'] = cbErro;

    // Usa ajax para fazer a requisição.
    $.get(configs);
  }

  constructor(titulo, ano, duracao, diretor, elenco, img, avaliacao) {
    // Valida alguns dados.
    this._validaDados(duracao, avaliacao);

    this.titulo = titulo;
    this.ano = ano;
    this.duracao = this._formataDuracao(duracao);
    this.diretor = diretor;
    this.elenco = elenco;
    this.img = img;
    this.avaliacao = this._avaliacaoPorcentagem(avaliacao);
    this.trailer = null; // É definido posteriormente.
  }
  
  /**
   * Valida alguns dados.
   * 
   * @param {string} duracao Deve ser uma string no formato '120 min'.
   */
  _validaDados(duracao, avaliacao) {
    if (!duracao || !duracao instanceof String)
      throw new TypeError('Duração precisa ser uma string não vazia');
    
    if (!avaliacao || !avaliacao instanceof Array)
      throw new TypeError('Avaliação precisa ser um array');
  }

  /**
   * Formata a duração do filme para o formato '0h 00min.'.
   * 
   * @param {string} duracao
   * @returns {string}
   */
  _formataDuracao(duracao) {
    const horasFracao = Number(duracao.split(' ')[0]) / 60;
    
    const horas = parseInt(horasFracao), // Transforma em horas.
          minutos = parseInt((horasFracao % 1) * 60), // Transforma em minutos.
          minutosFormatado = minutos.toString().length === 1 ? '0' + minutos : minutos;
    
    return `${horas}h ${minutosFormatado}min.`;
  }
  
  /**
   * Pega a porcentagem do Rotten Tomatoes no formato '0%'.
   * 
   * @param {{Source: string, Value: string}[]} avaliacaoArr
   * @returns {string}
   */
  _avaliacaoPorcentagem(avaliacaoArr) {
    const avaliacaoObj = avaliacaoArr.find((obj) => obj.Source.toLowerCase() === 'rotten tomatoes');

    return avaliacaoObj.Value;
  }
}
