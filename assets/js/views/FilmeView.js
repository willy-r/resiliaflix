/** Manipula as diversas formas de ver o filme no HTML. */
class FilmeView {
  /**
   * Cria o cartão que envolverá o conteúdo dos filmes.
   * 
   * @param {string} id ID do filme.
   * @returns {HTMLElement} O cartão do filme.
   */
  static criaCartaoFilme(id) {
    const cartao = document.createElement('article');

    cartao.className = 'card bg-transparent border-0';
    cartao.id = id;

    return cartao;
  }

  /**
   * Insere o cartão no carrosel.
   * 
   * @param {HTMLElement} cartao O cartão a ser inserido no carrosel.
   * @param {HTMLDivElement} carroselElement A div que receberá o cartão.
   */
   static insereCartaoNoCarrosel(cartao, carroselElement) {
    carroselElement.appendChild(cartao);
  }

  /**
   * @param {Filme} filmeModel
   */
  constructor(filmeModel) {
    // Verifica se é uma instância de filme.
    this._verificaModel(filmeModel);

    this.model = filmeModel;
  }

  _verificaModel(model) {
    if (!model || !model instanceof Filme)
      throw new TypeError('A model que a view deve receber deve ser um Filme');
  }

  /**
   * Insere o conteúdo do filme no cartão.
   * Não usa todas as informações do filme.
   * 
   * @param {HTMLElement} cartao Elemento contendo o cartão.
   */
  insereConteudoNoCartao(cartao) {
    cartao.innerHTML = `
      <img
        class="rounded img-cartao"
        src="${this.model.img}" alt="Poster do filme ${this.model.titulo}"
        data-bs-toggle="tooltip" data-bs-custom-class="lh-1 ff-rubik clr-primaria"
        title="${this.model.titulo}"
      >
      <main class="card-body px-1 pb-0 cursor-grab">
        <h3 class="card-title mb-0 text-truncate fs-5 fs-md-6 ff-roboto" title="${this.model.titulo}">
          ${this.model.titulo}
        </h3>
      </main>
      <footer class="card-footer border-top-0 bg-transparent px-1 cursor-grab">
        <span class="me-2">${this.model.ano}</span>
        <span><span class="bi bi-clock"></span> ${this.model.duracao}</span>
      </footer>
    `;
  }
}