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

  /** Uma conta nova será sempre criada. */
  static cadastraUsuario(nome, email, senha) {
    localStorage.setItem('nome', nome);
    localStorage.setItem('email', email);
    // Salva a senha codificada, só pra não ficar a mostra diretamente.
    localStorage.setItem('senha', btoa(senha));
    localStorage.setItem('cadastrado', '1');
  }
  
  static verificaCadastro(email, senha) {
    const emailSalvo = localStorage.getItem('email'),
          senhaSalva = atob(localStorage.getItem('senha')); // Decodifica a senha.
    
    return email === emailSalvo && senha === senhaSalva;
  }

  static emailExiste(email) {
    return email === localStorage.getItem('email');
  }

  static temCadastro() {
    return localStorage.getItem('cadastrado') === '1';
  }
}
