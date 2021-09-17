/**
 * Monta uma URL válida com a url base passada e os parâmetros.
 * 
 * @param {string} urlBase
 * @param {{string: string}} params Um objeto contendo os parâmetros e seus valores.
 * @returns {string} Uma string representando a URL resultante.
 */
function constroiURLValida(urlBase, params) {
  const url = new URL(urlBase);

  for (let nomeParametro in params)
    url.searchParams.set(nomeParametro, params[nomeParametro]);
  
  return url.toString();
}
