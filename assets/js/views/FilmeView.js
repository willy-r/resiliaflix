/** Manipula as diversas formas de ver o filme no HTML. */
class FilmeView {
  /**
  * Insere um elemento em outro elemento.
  * 
  * @param {HTMLElement} elementoFilho Elemento filho para ser inserido no elemento pai.
  * @param {HTMLElement} elementoPai Elemento pai onde o elemento filho será inserido.
  */
  static insereElemento(elementoFilho, elementoPai) {
    elementoPai.appendChild(elementoFilho);
  }

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
   * 
   * @param {HTMLElement} cartao Elemento contendo o cartão.
   */
  insereConteudoNoCartao(cartao) {
    $(cartao).html(`
      <img
        class="rounded img-cartao"
        src="${this.model.img}" alt="Poster of the movie ${this.model.titulo}"
        data-tooltip-toggle="tooltip" data-bs-custom-class="lh-1 ff-rubik clr-primaria"
        data-bs-toggle="modal" data-bs-target="#info-filme-modal"
        title="${this.model.titulo}"
      >
      <main class="card-body px-1 pb-0">
        <h3 class="card-title mb-0 text-truncate fs-5 fs-md-6 ff-roboto" title="${this.model.titulo}">
          ${this.model.titulo}
        </h3>
      </main>
      <footer class="card-footer border-top-0 bg-transparent px-1">
        <span class="me-2">${this.model.ano}</span>
        <span><span class="bi bi-clock clr-primaria"></span> ${this.model.duracao}</span>
      </footer>
    `);
  }

  /**
   * Insere o conteúdo do filme no modal.
   * 
   * @param {HTMLElement} modal Componente do modal.
   */
  insereConteudoNoModal(modal) {
    $(modal).html(`
      <dialog class="modal-content bg-dark text-light shadow" open>
        <header class="modal-header border-bottom-0">
          <h4 class="modal-title text-uppercase fw-bold ff-roboto clr-primaria" id="info-filme-label">
            About the movie
          </h4>
          <button class="btn-close bg-light" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
        </header>
        
        <main class="modal-body rounded shadow-sm h-100">
          <div class="container-fluid card border-0 bg-transparent cartao-modal">
            <div class="bg-img"></div>
            <div class="row g-0">
              <div class="col-md-4 align-self-center d-flex justify-content-center">
                <img class="img-fluid rounded shadow img-modal" src="${this.model.defineImagem('../../assets/images/movie-not-found-modal.png')}" alt="Poster of the movie ${this.model.titulo}">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h3 class="card-title text-uppercase ff-roboto">${this.model.titulo}</h3>
                  <div class="card-text d-flex justify-content-">
                    <div>
                      <span class="bi bi-calendar-event clr-primaria"></span> ${this.model.ano}
                    </div>
                    <div class="ms-3">
                      <span class="bi bi-clock clr-primaria"></span> ${this.model.duracao}
                    </div>
                    <div class="ms-3">
                      <span class="bi bi-star-fill clr-primaria"></span> ${this.model.avaliacao}
                    </div>
                  </div>
                  <p class="card-text">
                    <div>
                      <span class="fw-bold">Director:</span> ${this.model.direcao}
                    </div>
                    <div>
                      <span class="fw-bold">Actors:</span> ${this.model.elenco}
                    </div>
                  </p>
                  <p class="card-text lh-sm">
                   <span class="fw-bold">Synopsis:</span> 
                   <br>
                   ${this.model.sinopse}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <footer class="modal-footer border-top-0">
          <button class="btn text-uppercase move-esquerda botao" id="ver-trailer" type="button" data-bs-target="#trailer-filme-modal" data-bs-toggle="modal" data-bs-dismiss="modal">
            Ver trailer <span class="bi bi-arrow-return-right"></span>
          </button>
        </footer>
      </dialog>
    `);
  }

  /**
   * Insere o trailer no modal. 
   * 
   * @param {HTMLElement} modal Componente do modal.
   */
  insereTrailerNoModal(modal) {
    $(modal).html(`
      <dialog class="modal-content bg-dark text-light shadow" open>
        <header class="modal-header border-bottom-0">
          <h4 class="modal-title text-uppercase ff-roboto" id="trailer-filme-label">
            <span class="fw-bold clr-primaria">Trailer:</span> ${this.model.titulo}
          </h4>
          <button class="btn-close bg-light" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
        </header>
        
        <main class="modal-body rounded shadow-sm">
          <div class="container-fluid d-flex align-items-center p-3 h-100">
            <div class="bg-img trailer"></div>
            <iframe class="w-100 rounded trailer-modal" id="trailer-filme" src="${this.model.trailer}" title="Trailer of the movie ${this.model.titulo}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
            </iframe>
          </div>
        </main>
        
        <footer class="modal-footer border-top-0">
          <button class="btn text-uppercase move-esquerda botao" type="button"  data-bs-target="#info-filme-modal" data-bs-toggle="modal" data-bs-dismiss="modal">
            Back <span class="bi bi-arrow-return-left"></span>
          </button>
        </footer>
      </dialog>
    `);
  }

  /**
   * Mostra erro se a requisição do trailer falhar.
   * 
   * @param {HTMLElement} modal Componente do modal.
   */
  mostraErroTrailer(modal) {
    $(modal).html(`
      <dialog class="modal-content bg-dark text-light shadow">
        <header class="modal-header border-bottom-0">
          <h4 class="modal-title text-uppercase ff-roboto" id="trailer-filme-label">
            <span class="fw-bold clr-primaria">Trailer:</span> ${this.model.titulo}
          </h4>
          <button class="btn-close bg-light" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
        </header>
        
        <main class="modal-body rounded shadow-sm">
          <div class="container-fluid d-flex align-items-center p-3 h-100">
            <div class="bg-img trailer"></div>
            <div class="d-flex justify-content-center align-items-center w-100 trailer-modal">
              <h3 class="text-danger text-center fw-bold display-2 mx-2">
                Trailer unvailable.
              </h3>
            </div>
          </div>
        </main>
        
        <footer class="modal-footer border-top-0">
          <button class="btn text-uppercase move-esquerda botao" type="button"  data-bs-target="#info-filme-modal" data-bs-toggle="modal" data-bs-dismiss="modal">
            Back <span class="bi bi-arrow-return-left"></span>
          </button>
        </footer>
      </dialog>
    `);
  }
}
