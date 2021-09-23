const form = $('#form');
const campoCep = $("#cep");

form.submit((event) => {
  event.preventDefault();

  if (!verificaSenha($('#senha').val())) {
    $('#erro-senha').show();
  } else {
    if (!verificaSenhaIgual($('#senha').val(), $('#confirma-senha').val())) {
      $('#erro-confirma-senha').show(); 
    } else {
      redirecionaParaPagina('../thanks/');
    }
  }
});

// Previne o usuário de copiar e colar a senha no input de confirmação de senha.
$('#confirma-senha').on('paste', (event) => event.preventDefault());

// Preenche automaticamente os campos relacionados ao
// endereço da pessoa, de acordo com o CEP fornecido.
campoCep.blur(() => {
  const cep = campoCep.val().replace(/\D/g, '');

  if (cep) {
    // Regex para verificar CEP.
    const cepRegex  = /^[0-9]{8}$/;

    if (cepRegex.test(cep)) {
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

function verificaSenha(senha) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return regex.test(senha);
}

function verificaSenhaIgual(senha, confirmaSenha) {
  return senha === confirmaSenha;
}

// Usuários.
UsuarioController.alteraPaginaQuandoDeslogaUsuario();
UsuarioController.alteraPaginaUsuarioLogado();
