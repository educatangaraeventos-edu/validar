const API_URL =
'https://script.google.com/macros/s/AKfycbxISKb7Sq5bkEYIcs8DTElxV8D93fsfbPZDd1fIlQM-CBl-hoSRb82fk08TY1m9fAtx/exec';

function voltarInicio() {

  window.location.href =
    'index.html';

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
      'perfilEmail'
    ).textContent =
      servidor.email || '-';

    document.getElementById(
      'perfilStatus'
    ).textContent =
      servidor.status || '-';

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
