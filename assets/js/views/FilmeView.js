/** Manipula as diversas formas de ver o filme no HTML. */
class FilmeView {
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
   * Cria um cartão do filme com algumas informações.
   * 
   * @returns {HTMLElement} O cartão com as informações do filme.
   */
  criaCartaoFilme() {
    const cartao = document.createElement('article');

    cartao.className = 'card bg-transparent border-0';
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

    return cartao;
  }

  /**
   * Insere o cartão no carrosel.
   * 
   * @param {HTMLElement} cartao O cartão a ser inserido no carrosel.
   * @param {HTMLDivElement} carroselElement A div que receberá o cartão.
   */
  insereCartaoNoCarrosel(cartao, carroselElement) {
    carroselElement.appendChild(cartao);
  }
}
