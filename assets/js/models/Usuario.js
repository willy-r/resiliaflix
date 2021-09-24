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

  /**
   * 
   * Sempre que o usuário se cadastrar, uma "nova conta" vai ser criada.
   * 
   * @param {*} nome 
   * @param {*} email 
   * @param {*} senha 
   */
  static cadastraUsuario(nome, email, senha) {
    localStorage.setItem('nome', nome);
    localStorage.setItem('email', email);
    // Salva a senha codificada, só algo pra não ficar a mostra diretamente.
    localStorage.setItem('senha', btoa(senha));
  }
  
  static estaCadastrado(email, senha) {
    const emailSalvo = localStorage.getItem('email'),
          senhaSalva = atob(localStorage.getItem('senha')); // Decodifica a senha.
    
    return email === emailSalvo && senha === senhaSalva;
  }

  static emailExiste(email) {
    return email === localStorage.getItem('email');
  }
}
