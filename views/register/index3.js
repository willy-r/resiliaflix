function limpa_formulário_cep() {
        //Limpa valores do formulário de cep.
        document.getElementById('rua').value=("");
        document.getElementById('bairro').value=("");
        document.getElementById('cidade').value=("");
        document.getElementById('uf').value=("");
        document.getElementById('ibge').value=("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('rua').value=(conteudo.logradouro);
        document.getElementById('bairro').value=(conteudo.bairro);
        document.getElementById('cidade').value=(conteudo.localidade);
        document.getElementById('uf').value=(conteudo.uf);
        document.getElementById('ibge').value=(conteudo.ibge);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}
    
function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('rua').value="...";
            document.getElementById('bairro').value="...";
            document.getElementById('cidade').value="...";
            document.getElementById('uf').value="...";
            document.getElementById('ibge').value="...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};

var password = document.getElementById("password")
  , confirm_password = document.getElementById("confirm_password");

function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Senhas diferentes!");
  } else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;


function nu(campo){
  var digits="0123456789"
  var campo_temp 
  for (var i=0;i<campo.value.length;i++){
  campo_temp=campo.value.substring(i,i+1) 
  if (digits.indexOf(campo_temp)==-1){
  campo.value = campo.value.substring(0,i);
  break;
  }
  }
  }
   
  function ValRG(numero){
   /*
   ##  Igor Carvalho de Escobar
   ##    www.webtutoriais.com
   ##   Java Script Developer
   */
   var numero = numero.split("");
   tamanho = numero.length;
   vetor = new Array(tamanho);
   
  if(tamanho>=1)
  {
   vetor[0] = parseInt(numero[0]) * 2; 
  }
  if(tamanho>=2){
   vetor[1] = parseInt(numero[1]) * 3; 
  }
  if(tamanho>=3){
   vetor[2] = parseInt(numero[2]) * 4; 
  }
  if(tamanho>=4){
   vetor[3] = parseInt(numero[3]) * 5; 
  }
  if(tamanho>=5){
   vetor[4] = parseInt(numero[4]) * 6; 
  }
  if(tamanho>=6){
   vetor[5] = parseInt(numero[5]) * 7; 
  }
  if(tamanho>=7){
   vetor[6] = parseInt(numero[6]) * 8; 
  }
  if(tamanho>=8){
   vetor[7] = parseInt(numero[7]) * 9; 
  }
  if(tamanho>=9){
   vetor[8] = parseInt(numero[8]) * 100; 
  }
   
   total = 0;
   
  if(tamanho>=1){
   total += vetor[0];
  }
  if(tamanho>=2){
   total += vetor[1]; 
  }
  if(tamanho>=3){
   total += vetor[2]; 
  }
  if(tamanho>=4){
   total += vetor[3]; 
  }
  if(tamanho>=5){
   total += vetor[4]; 
  }
  if(tamanho>=6){
   total += vetor[5]; 
  }
  if(tamanho>=7){
   total += vetor[6];
  }
  if(tamanho>=8){
   total += vetor[7]; 
  }
  if(tamanho>=9){
   total += vetor[8]; 
  }
   
   
   resto = total % 11;
  if(resto!=0){
  document.getElementById('camada').innerHTML="<font face=verdana size=2 color=red>RG Inválido!</font><br><br>";
  }
  else{
  document.getElementById('camada').innerHTML="<font face=verdana size=2 color=forestgreen>RG Válido!</font><br><br>";
  }
  }