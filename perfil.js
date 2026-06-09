const API_URL =
'https://script.google.com/macros/s/AKfycbxISKb7Sq5bkEYIcs8DTElxV8D93fsfbPZDd1fIlQM-CBl-hoSRb82fk08TY1m9fAtx/exec';

function voltarInicio() {

  window.location.href =
    'index.html';

}
function converterLinkFotoDrive(link) {

  if (!link) {
    return 'icone-usuario-dourado.png';
  }

  const texto =
    String(link);

  let id = '';

  if (texto.includes('open?id=')) {

    id =
      texto.split('open?id=')[1]
        .split('&')[0];

  }

  if (texto.includes('/file/d/')) {

    id =
      texto.split('/file/d/')[1]
        .split('/')[0];

  }

  if (!id) {
    return link;
  }

  return (
    'https://drive.google.com/thumbnail?id=' +
    id
  );

}
async function carregarPerfil() {

  const usuario = JSON.parse(
    localStorage.getItem('usuario')
  );

  if (!usuario) {

    window.location.href =
      'index.html';

    return;

  }

  const email =

    usuario.EMAIL ||

    usuario.email ||

    '';

  try {

    const resposta =

      await fetch(

        API_URL +

        '?action=servidorEmail&email=' +

        encodeURIComponent(email)

      );

    const servidor =

      await resposta.json();
document.getElementById(
  'fotoServidor'
).src =
  converterLinkFotoDrive(
    servidor.foto
  );
    document.getElementById(
      'nomeUsuario'
    ).textContent =
      servidor.nome || '-';

    document.getElementById(
      'cargoUsuario'
    ).textContent =
      servidor.cargo || '-';

    document.getElementById(
      'perfilNome'
    ).textContent =
      servidor.nome || '-';

    document.getElementById(
      'perfilCargo'
    ).textContent =
      servidor.cargo || '-';

    document.getElementById(
      'perfilEscola'
    ).textContent =
      servidor.escola || '-';

    document.getElementById(
      'perfilStatus'
    ).textContent =
      servidor.status || '-';
    
let matricula =
  String(
    servidor.matricula || ''
  );

matricula =
  matricula.replace(
    /\D/g,
    ''
  );

if (matricula.length > 1) {

  matricula =
    matricula.slice(0, -1) +
    '-' +
    matricula.slice(-1);

}

document.getElementById(
  'perfilMatricula'
).textContent =
  matricula || '-';

let telefone =
  String(
    servidor.telefone || ''
  );
    
    telefone =
  telefone.replace(
    /\D/g,
    ''
  );

if (telefone.length === 11) {

  telefone =
    '(' +
    telefone.substring(0,2) +
    ') ' +
    telefone.substring(2,7) +
    '-' +
    telefone.substring(7);

}

document.getElementById(
  'perfilTelefone'
).textContent =
  telefone || '-';
    
    const btnCracha =
      document.getElementById(
        'btnCracha'
      );

    if (
      servidor.crachaLink
    ) {

      btnCracha.onclick =
        function() {

          window.open(
            servidor.crachaLink,
            '_blank'
          );

        };

    } else {

      btnCracha.disabled =
        true;

      btnCracha.textContent =
        'Crachá indisponível';

    }

  }

  catch (erro) {

    console.error(
      erro
    );

    alert(
      'Erro ao carregar perfil.'
    );

  }

}

window.onload =
  carregarPerfil;
