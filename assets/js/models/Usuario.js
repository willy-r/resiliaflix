/**
 * Classe simples representando um usuário,
 * controla login, logout, e verifica se está logado.
 */
class Usuario {
  static logaUsuario() {
    localStorage.setItem('logado', '1');
  }

  static deslogaUsuario() {
    localStorage.removeItem('logado');
  }

  static estaLogado() {
    return localStorage.getItem('logado') === '1';
  }
}
