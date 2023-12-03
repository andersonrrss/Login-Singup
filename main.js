//////////////////////////SERVIDOR///////////////////////
var usuarios = []; //Variável que armazena todos os usuários
//Validação do sing-up
const nomeErro = document.getElementById("nomeErro"); //Parágrafo de erro do nome de usuário no singup
const emailErro = document.getElementById("emailErro"); //Parágrafo de erro do email no singup
const senhaErro = document.getElementById("senhaErro"); //Parágrafo de erro da senha no singup
const cpfErro = document.getElementById("cpfErro"); //parágrafo de erro do cpf no singup
//Função que checa se as informações do singup são válidas
function singupValido(informacoes) {
  let check = true; //Variável de controle
  document
    .querySelectorAll(".campos")
    .forEach((campo) => (campo.style.borderColor = "#3363ff")); //Reseta a cor dos campos de singup

  document.querySelectorAll(".erro").forEach((erro) => (erro.innerHTML = null)); //Limpa os parágrafos de erros
  usuarioExistente(informacoes) ? (check = false) : false; //Checa se o usuário existe
  //Checa se o nome de usuário tem pelo menos 6 letras
  if (informacoes.nome.length < 6) {
    informacoes.nome == 0 //Se for igual a 0
      ? (nomeErro.innerHTML = "Insira um nome") //Insira um nome
      : (nomeErro.innerHTML = "O nome precisa ter pelo menos 6 letras"); //Se for maior que 0, O nome precisa ter pelo menos 6 letras
    document.getElementById("username").style.borderColor = "red"; //Muda a cor da borda do campo para 0
    check = false;
  }
  if (emailInvalido(informacoes.email)) {
    document.getElementById("email").style.borderColor = "red";
    check = false;
  }
  if (senhaInvalida(informacoes.senha)) {
    document.getElementById("senha").style.borderColor = "red";
    check = false;
  }
  if (cpfInvalido(informacoes.cpf)) {
    document.getElementById("cpf").style.borderColor = "red";
    check = false;
  }
  return check;
}
function emailInvalido(email) {
  if (email.length == 0) {
    emailErro.innerHTML = "Insira um e-mail";
    return true;
  } else {
    // Expressão regular para validar o formato de um endereço de email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    //Testa o emai
    !emailPattern.test(email)
      ? (emailErro.innerHTML = "O e-mail inserido não é válido")
      : false;
    // Testa se o email corresponde ao padrão
    return !emailPattern.test(email);
  }
}

function senhaInvalida(senha) {
  if (senha.length < 8) {
    senha.length == 0
      ? (senhaErro.innerHTML = "Insira uma senha")
      : (senhaErro.innerHTML = "A senha deve ter pelo menos 8 caracteres");
    return true;
  }
  return false;
}

function cpfInvalido(cpf) {
  if (cpf.length == 0) {
    cpfErro.innerHTML = "Insira um CPF";
    return true;
  } else {
    if (!validateCPF(cpf)) {
      cpfErro.innerHTML = "CPF inválido";
      return true;
    }
  }
}
function validateCPF(cpf) {
  cpf = cpf.split(""); //Separa todos os digitos do cpf em uma array
  //Transforma todos os digitos do cpf em número
  for (let i in cpf) {
    cpf[i] = Number(cpf[i]);
  }
  cpf = cpf.filter((digito) => !isNaN(digito)); //Remove a máscara do CPF
  //Checa se o CPF é menor que 11
  if (cpf.length < 11) {
    return false;
    //Checa se todos os digitos do CPF são iguais
  } else if (digitosIguais(cpf)) {
    return false;
    //Checa se o CPF passa pelas validações
  } else {
    return primeiraValidacao(cpf) && segundaValidacao(cpf);
  }
}
//Função que define a primeira validação do CPF
function primeiraValidacao(num) {
  let multiplicador = 10; //Multiplicador
  let numerosMultiplicados = []; //Array que armazena os númweros após serem multiplicados
  //Estrutura que multiplica todos os números
  for (let i = 0; i <= 8; i++, multiplicador--) {
    numerosMultiplicados.push(num[i] * multiplicador); //multiplica o número pelo multiplicador
  }
  let resultado =
    numerosMultiplicados.reduce(
      (acumulador, elemento) => acumulador + elemento,
      0
    ) % 11; //Soma todos os números da array
  //Faz a validação do 10° número do CPF
  if (resultado <= 1) {
    return num[9] === 0; //Se o resultado for menor que 1 o número tem que ser 0
  } else {
    return 11 - resultado == num[9]; //Se o resultado for de 2 pra cima o número tem que ser igual a 11 - o resultado
  }
}

//Função que define a segunda validação do CPF
function segundaValidacao(num) {
  let multiplicador = 11; //Multiplicador
  let numerosMultiplicados = []; //Array que armazena os númweros após serem multiplicados
  //Estrutura que multiplica todos os números
  for (let i = 0; i <= 9; i++, multiplicador--) {
    numerosMultiplicados.push(num[i] * multiplicador); //multiplica o número pelo multiplicador
  }
  let resultado =
    numerosMultiplicados.reduce(
      (acumulador, elemento) => acumulador + elemento,
      0
    ) % 11; //Soma todos os números da array
  //Faz a validação do 11° número do CPF
  if (resultado <= 1) {
    return num[10] === 0; //Se o resultado for menor que 1 o número tem que ser 0
  } else {
    return 11 - resultado == num[10]; //Se o resultado for de 2 pra cima o número tem que ser igual a 11 - o resultado
  }
}
//Função que checa se os dígitos são iguais
function digitosIguais(num) {
  //itera pelos digitos do CPF
  for (let i = 1; i < num.length; i++) {
    //Se algúm digito diferente for encontrado então o loop é parado e é retornado que existem digitos diferentes
    if (num[i] !== num[0]) {
      return false;
    }
    //Se o loop acabar e não for parado então existe, números iguais
    return true;
  }
}
function usuarioExistente(infos) {
  let check = false;
  if (usuarios.length > 0) {
    for (let i in usuarios) {
      if (infos.nome === usuarios[i].nome) {
        document.getElementById("username").style.borderColor = "red";
        nomeErro.innerHTML = "Este nome de usuário já está em uso";
        check = true;
      }
      if (infos.email === usuarios[i].email) {
        emailErro.innerHTML = "Este email já está em uso";
        document.getElementById("email").style.borderColor = "red";
        check = true;
      }
      if (infos.cpf === usuarios[i].cpf) {
        cpfErro.innerHTML = "Este CPF já foi cadastrado";
        document.getElementById("cpf").style.borderColor = "red";
        check = true;
      }
    }
  }
  return check;
}

//Validação do login
let usuarioAtual = null;
const loginNomeErro = document.getElementById("nomeLoginErro");
const loginEmailErro = document.getElementById("emailLoginErro");
const loginSenhaErro = document.getElementById("senhaLoginErro");

function validarLogin(informacoes) {
  let check = false;
  document
    .querySelectorAll(".camposLogin")
    .forEach((campo) => (campo.style.borderColor = "#3363ff"));
  document
    .querySelectorAll(".erroLogin")
    .forEach((erro) => (erro.innerHTML = null));
  if (loginVazio(informacoes)) {
    if (usuarios.length === 0) {
      mostrarSingUp();
      alert("Usuários ainda não cadastrados");
    } else {
      for (let i in usuarios) {
        let checkNome = false;
        let checkEmail = false;
        if (usuarios[i].nome === informacoes.nome) {
          checkNome = true;
        }
        if (usuarios[i].email === informacoes.email) {
          checkEmail = true;
        }
        if (checkNome && checkEmail) {
          if (usuarios[i].senha == informacoes.senha) {
            check = true;
            mostrarPaginaPrincipal();
            usuarioAtual = new usuarioLogado(usuarios[i]);
          } else {
            loginSenhaErro.innerHTML = "Senha incorreta";
            document.getElementById("loginSenha").style.borderColor = "red";
          }
        } else {
          if (!checkNome) {
            document.getElementById("loginNome").style.borderColor = "red";
            loginNomeErro.innerHTML = "Nome de usuário incorreto";
          }
          if (!checkEmail) {
            document.getElementById("loginEmail").style.borderColor = "red";
            loginEmailErro.innerHTML = "Email incorreto";
          }
        }
      }
      return check;
    }
  }
}
function loginVazio(informacoes) {
  let check = true;
  if (informacoes.nome.length === 0) {
    loginNomeErro.innerHTML = "Por favor digite um nome de usuário";
    document.getElementById("loginNome").style.borderColor = "red";
    check = false;
  }
  if (informacoes.email.length === 0) {
    loginEmailErro.innerHTML = "Por favor digite um email";
    document.getElementById("loginEmail").style.borderColor = "red";
    check = false;
  }
  if (informacoes.senha.length === 0) {
    loginSenhaErro.innerHTML = "Por favor digite uma senha";
    document.getElementById("loginSenha").style.borderColor = "red";
    check = false;
  }
  return check;
}

function mostrarSingUp() {
  limparCamposSingup();
  document.getElementById("mensagem").innerHTML = null;
  document.getElementById("singupPage").style.display = "block";
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("mainPage").style.display = "none";
}
function mostrarLogin() {
  if (usuarios.length === 0) {
    alert("Ainda não há nenhum usuário cadastrado");
  } else {
    limparCamposLogin();
    document.getElementById("singupPage").style.display = "none";
    document.getElementById("loginPage").style.display = "block";
    document.getElementById("mainPage").style.display = "none";
  }
}
function mostrarPaginaPrincipal() {
  document.getElementById("singupPage").style.display = "none";
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("mainPage").style.display = "block";
}

function usuarioLogado(infos) {
  (this.nome = infos.nome),
    (this.email = infos.email),
    (this.cpf = infos.cpf),
    (this.senha = infos.senha),
    (this.genero = infos.genero);
}

////////////////PÁGINA PRINCIPAL///////////////////////

document.querySelector("#singupbtn").addEventListener("click", mostrarSingUp);
document.getElementById("loginbtn").addEventListener("click", mostrarLogin);

let menuShowing = false;
document.getElementById("userMenubtn").addEventListener("click", function () {
  if (!menuShowing) {
    if (usuarioAtual !== null) {
      document.getElementById("userMenuInfos").style.display = "inline-block";
      document.getElementById("userMenu").style.backgroundColor = "aliceblue";
      document.getElementById("menuNome").innerHTML = usuarioAtual.nome;
      document.getElementById(
        "menuEmail"
      ).innerHTML = `Email: ${usuarioAtual.email}`;
      document.getElementById("menuCpf").innerHTML = `CPF: ${usuarioAtual.cpf}`;
      document.getElementById("menuSenha").innerHTML = `Senha: ${ocultarSenha(
        usuarioAtual.senha
      )}`;
      document.getElementById(
        "menuGenero"
      ).innerHTML = `Gênero: ${usuarioAtual.genero}`;
      document.getElementById("userMenubtn").src = "user-solid-black.svg";
      menuShowing = true;
    }
  } else {
    document.getElementById("userMenubtn").src = "user-solid.svg";
    document.getElementById("userMenu").style.backgroundColor = "transparent";
    document.getElementById("userMenuInfos").style.display = "none";
    document.getElementById("mostrarSenha").checked = false;
    menuShowing = false;
  }
});
function ocultarSenha(senha) {
  let senhaOculta = "";
  for (let i = 0; i < senha.length; i++) {
    senhaOculta += "*";
  }
  return senhaOculta;
}

document.getElementById("mostrarSenha").addEventListener("click", function () {
  if (!document.getElementById("mostrarSenha").checked) {
    document.getElementById("menuSenha").innerHTML = `Senha: ${ocultarSenha(
      usuarioAtual.senha
    )}`;
  } else {
    document.getElementById(
      "menuSenha"
    ).innerHTML = `Senha: ${usuarioAtual.senha}`;
  }
});

////////////////////////SING-UP/////////////////////////////

// Função para aplicar a máscara de CPF
function formatarCPF() {
  const cpfInput = document.getElementById("cpf"); //Define o input de cpf
  let valor = cpfInput.value.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (valor.length > 11) {
    valor = valor.slice(0, 11); // Limita a 11 dígitos
  }

  valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"); // Aplica a máscara

  cpfInput.value = valor; // Define o valor formatado de volta no campo de entrada
}

const cpfInput = document.getElementById("cpf"); //Define o input de cpf(de novo)
cpfInput.addEventListener("input", formatarCPF); // Adiciona um ouvinte de eventos de entrada, e assim que o CPF terminar de ser digitado a máscara será aplicada
class usuario {
  constructor(informacoes, genero) {
    (this.nome = informacoes.nome),
      (this.email = informacoes.email),
      (this.senha = informacoes.senha),
      (this.cpf = informacoes.cpf),
      (this.genero = this.generoProcessado(genero));
  }
  generoProcessado(genero) {
    switch (genero) {
      case "masc":
        return "Masculino";
      case "fem":
        return "Feminino";
      case "outro":
        return "Outro";
      default:
        return "Não informado";
    }
  }
}

document.querySelector("#criarConta").addEventListener("click", function () {
  const infosUsuario = {
    nome: document.getElementById("username").value,
    email: document.getElementById("email").value,
    senha: document.getElementById("senha").value,
    cpf: document.getElementById("cpf").value,
  };
  const genero = document.getElementById("genero").value;
  if (singupValido(infosUsuario)) {
    let novoUsuario = new usuario(infosUsuario, genero);
    usuarios.push(novoUsuario);
    document.querySelector("#mensagem").innerHTML = "Conta criada!";
    limparCamposSingup();
    setTimeout(() => {
      mostrarLogin();
    }, 800);
  } else {
    document.querySelector("#mensagem").innerHTML =
      "Cheque seus dados e tente novamente";
  }
});
document
  .getElementById("loginRedirect")
  .addEventListener("click", mostrarLogin);
document
  .getElementsByClassName("homebtn")[0]
  .addEventListener("click", mostrarPaginaPrincipal);

function limparCamposSingup() {
  document
    .querySelectorAll(".campos")
    .forEach((elemento) => (elemento.value = null));
  document
    .querySelectorAll(".erro")
    .forEach((elemento) => (elemento.innerHTML = null));
}

///////////////////////PÁGINA DE LOGIN////////////////////////////

document.querySelector("#login").addEventListener("click", function () {
  let userLogin = {
    nome: document.getElementById("loginNome").value,
    email: document.getElementById("loginEmail").value,
    senha: document.getElementById("loginSenha").value,
  };
  if (validarLogin(userLogin)) {
    limparCamposLogin();
  }
});
document
  .getElementById("singupRedirect")
  .addEventListener("click", mostrarSingUp);
document
  .getElementsByClassName("homebtn")[1]
  .addEventListener("click", mostrarPaginaPrincipal);
function limparCamposLogin() {
  document
    .querySelectorAll(".camposLogin")
    .forEach((elemento) => (elemento.value = null));
  document
    .querySelectorAll(".erroLogin")
    .forEach((elemento) => (elemento.innerHTML = null));
}