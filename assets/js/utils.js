function constroiURLValida(urlBase, params) {
  const url = new URL(urlBase);

  for (let nomeParametro in params)
    url.searchParams.set(nomeParametro, params[nomeParametro]);
  
  return url.toString();
}
