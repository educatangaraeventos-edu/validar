const API_URL =

'https://script.google.com/macros/s/AKfycbxISKb7Sq5bkEYIcs8DTElxV8D93fsfbPZDd1fIlQM-CBl-hoSRb82fk08TY1m9fAtx/exec';

async function consultarPermissao(
  email
) {

  const resposta =

    await fetch(

      API_URL +

      '?action=permissaoEmail&email=' +

      encodeURIComponent(
        email
      )

    );

  return resposta.json();

}

function sair() {

  localStorage.removeItem(
    'usuario'
  );

  location.reload();

}

function mostrarLogin() {

  document
    .getElementById(
      'conteudo'
    )
    .innerHTML = `

    <div class="card">

      <h2>

        Entrar no Sistema

      </h2>

      <br>

      <input
        id="email"
        type="email"
        placeholder="Digite seu e-mail">

      <br><br>

      <button
        class="btn-principal"
        onclick="entrar()">

        Entrar

      </button>

    </div>

  `;

}

async function entrar() {

  const email =

    document
      .getElementById(
        'email'
      )
      .value
      .trim();

  if (!email) {

    alert(
      'Informe o e-mail.'
    );

    return;

  }

  const usuario =

    await consultarPermissao(
      email
    );

  if (

    usuario.status !==
    'ATIVO'

  ) {

    alert(
      'Usuário sem acesso.'
    );

    return;

  }

  localStorage.setItem(

    'usuario',

    JSON.stringify(
      usuario
    )

  );

  carregarSistema();

}

function montarMenu(
  usuario
) {

  return `

<div class="grid">

  <a
    href="perfil.html"
    class="card-menu">

    <img
      src="icone-meu-perfil.png">

    <h3>

      Meu Perfil

    </h3>

  </a>

  <a
    href="escola.html"
    class="card-menu">

    <img
      src="icone-escola.png">

    <h3>

      Painel da Escola

    </h3>

  </a>

  <a
    href="eventos.html"
    class="card-menu">

    <img
      src="icone-eventos.png">

    <h3>

      Eventos

    </h3>

  </a>

  <a
    href="admin.html"
    class="card-menu">

    <img
      src="icone-administracao.png">

    <h3>

      Administração

    </h3>

  </a>

  <a
    href="coordenador.html"
    class="card-menu">

    <img
      src="icone-coordenador.png">

    <h3>

      Coordenador de Ensino

    </h3>

  </a>

  <a
    href="validar.html"
    class="card-menu">

    <img
      src="icone-validacao.png">

    <h3>

      Validar Certificados

    </h3>

  </a>

</div>

`;

}

function carregarSistema() {

  const usuario =

    JSON.parse(

      localStorage.getItem(
        'usuario'
      )

    );

  document
    .getElementById(
      'usuarioArea'
    )
    .innerHTML = `

    <div class="usuario-nome">

      ${usuario.email}

    </div>

    <div class="usuario-perfil">

      ${usuario.perfil}

    </div>

    <button
      class="btn-sair"
      onclick="sair()">

      Sair

    </button>

  `;

  document
    .getElementById(
      'conteudo'
    )
    .innerHTML =

    montarMenu(
      usuario
    );

}

window.onload = () => {

  const usuario =

    localStorage.getItem(
      'usuario'
    );

  if (!usuario) {

    mostrarLogin();

    return;

  }

  carregarSistema();

};
