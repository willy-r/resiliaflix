const form = $('#form');
const campoCep = $('#cep'),
      campoNome = $('#nome'),
      campoEmail = $('#email'),
      campoSenha = $('#senha');
      campoConfirmaSenha = $('#confirma-senha');

form.submit((event) => {
  event.preventDefault();

  // Verifica se a senha atende aos requisitos.
  if (verificaSenha(campoSenha.val()) && verificaSenhaIgual(campoSenha.val(), campoConfirmaSenha.val())) {
    Usuario.cadastraUsuario(campoNome.val(), campoEmail.val(), campoSenha.val());
    redirecionaParaPagina('../thanks/');
  }
});

// Mostra mensagem de erro no campo de senha
// se a senha não atender aos requisitos.
campoSenha.blur(() => {
  if (campoSenha.val()) {
    if (!verificaSenha(campoSenha.val()))
      $('#erro-senha').show();
    else
      $('#erro-senha').hide();
  } else {
    $('#erro-senha').hide();
  }
});

/**
 * Verifica se a senha atende aos requisitos que são:
 * Ter no mínimo 6 caracteres, uma letra e um número.
 * 
 * @param {string} senha Senha do usuário.
 * @returns {boolean} True se a senha atende aos requisitos, se não retorna false.
 */
function verificaSenha(senha) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return regex.test(senha);
}

// Previne o usuário de copiar e colar a senha no input de confirmação de senha.
campoConfirmaSenha.on('paste', (event) => event.preventDefault());

// Mostra mensagem de erro no campo de confirmar
// senha se as senhas não forem iguais.
campoConfirmaSenha.blur(() => {
  if (campoConfirmaSenha.val()) {
    if (!verificaSenhaIgual(campoSenha.val(), campoConfirmaSenha.val()))
      $('#erro-confirma-senha').show();
    else
      $('#erro-confirma-senha').hide();
  } else {
    $('#erro-confirma-senha').hide();
  }
});

/**
 * Verifica se a senha de confirmação é igual a senha digitada.
 * 
 * @param {string} senha Senha digitada pelo usuário.
 * @param {string} confirmaSenha Senha de confirmação digitada pelo usuário.
 * @returns {boolean} True se as senhas forem iguais, se não retorna false.
 */
function verificaSenhaIgual(senha, confirmaSenha) {
  return senha === confirmaSenha;
}

// Gera um email aleatório para o usuário.
$('#gera-email').click((event) => {
  event.preventDefault();

  const nome = campoNome.val(),
        nomeFormatado = nome ? nome.replace(' ', '').trim().toLowerCase() : 'email';

  campoEmail.val(`${nomeFormatado}@example.com`);
});

// Preenche automaticamente os campos relacionados ao
// endereço da pessoa, de acordo com o CEP fornecido.
campoCep.blur(() => {
  const cep = campoCep.val().replace(/\D/g, '');

  if (cep) {
    // Regex para verificar CEP.
    const cepRegex  = /^[0-9]{8}$/;

    if (cepRegex.test(cep)) {
      // CEP é válido.
      $('#erro-cep').hide();
      // Preenche os campos com '...' enquanto consulta a API.
      $("#estado").val('...');
      $("#cidade").val('...');
      $("#bairro").val('...');
      $("#rua").val('...');
      $("#complemento").val('...');

      // Consulta API ViaCEP.
      $.get({
        url: `https://viacep.com.br/ws/${cep}/json/`,
        success: (dados) => {
          if (!('erro' in dados)) {
            $("#bairro").val(dados.bairro);
            $("#cidade").val(dados.localidade);
            $("#uf").val(dados.uf);
            $("#rua").val(dados.logradouro);
            $("#complemento").val(dados.complemento);
          }
        }
      });
    } else {
      // CEP é inválido.
      $('#erro-cep').show();
      limpaFormularioCep();
    }
  } else {
    // CEP sem valor, limpa formulário.
    limpaFormularioCep();
  }
});

function limpaFormularioCep() {
  $("#bairro").val('');
  $("#cidade").val('');
  $("#estado").val('');
  $("#rua").val('');
  $("#complemento").val('');
}

// Usuários.
UsuarioController.alteraPaginaQuandoDeslogaUsuario();
UsuarioController.alteraPaginaUsuarioLogado();
