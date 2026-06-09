const API_URL =
'https://script.google.com/macros/s/AKfycbxISKb7Sq5bkEYIcs8DTElxV8D93fsfbPZDd1fIlQM-CBl-hoSRb82fk08TY1m9fAtx/exec';

function consultarPermissao(email) {
  return new Promise((resolve, reject) => {
    const callbackNome = 'callback_' + Date.now();
    const script = document.createElement('script');

    window[callbackNome] = function(dados) {
      resolve(dados);
      delete window[callbackNome];
      script.remove();
    };

    script.src =
      API_URL +
      '?action=permissaoEmail' +
      '&email=' +
      encodeURIComponent(email) +
      '&callback=' +
      callbackNome;

    script.onerror = function() {
      reject(new Error('Erro ao carregar dados da API.'));
    };

    document.body.appendChild(script);
  });
}

function sair() {
  localStorage.removeItem('usuario');
  location.reload();
}

function mostrarLogin() {
  document.getElementById('loginContainer').style.display = 'block';
  document.getElementById('menu').style.display = 'none';
  document.getElementById('usuarioArea').innerHTML = '';
}

async function entrar() {
  const email = document.getElementById('email').value.trim();

  if (!email) {
    alert('Informe o e-mail.');
    return;
  }

  try {
    const usuario = await consultarPermissao(email);

    if (!usuario || usuario.status !== 'ATIVO') {
      alert('Usuário sem acesso.');
      return;
    }

    localStorage.setItem('usuario', JSON.stringify(usuario));
    carregarSistema();

  } catch (erro) {
    console.error(erro);
    alert('Erro ao consultar permissões.');
  }
}

function carregarSistema() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if (!usuario) {
    mostrarLogin();
    return;
  }

  const nomeUsuario =
    usuario.NOME_COMPLETO ||
    usuario.nomeCompleto ||
    usuario.nome ||
    usuario.NOME ||
    usuario.email ||
    'Usuário';

  const cargoUsuario =
    usuario.CARGO ||
    usuario.cargo ||
    usuario.perfil ||
    usuario.PERFIL ||
    'Servidor';

  document.getElementById('usuarioArea').innerHTML = `
    <div class="card-usuario">

      <div class="usuario-info">
        <div class="usuario-nome">
          ${nomeUsuario}
        </div>

        <div class="usuario-cargo">
          ${cargoUsuario}
        </div>
      </div>

      <div class="usuario-sair">
        <button
          onclick="sair()"
          class="btn-sair-header">
          Sair
        </button>
      </div>

    </div>
  `;

  document.getElementById('loginContainer').style.display = 'none';
  document.getElementById('menu').style.display = 'grid';
}

window.onload = function() {
  const usuario = localStorage.getItem('usuario');

  if (usuario) {
    carregarSistema();
  } else {
    mostrarLogin();
  }
};
