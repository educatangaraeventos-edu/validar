function voltarInicio() {

  window.location.href =
    'index.html';

}

function carregarPerfil() {

  const usuario = JSON.parse(
    localStorage.getItem('usuario')
  );

  if (!usuario) {

    window.location.href =
      'index.html';

    return;

  }

  const nome =
    usuario.NOME ||
    usuario.nome ||
    'Não informado';

  const cargo =
    usuario.PERFIL ||
    usuario.perfil ||
    'Não informado';

  const escola =
    usuario.ESCOLA ||
    usuario.escola ||
    'Não informado';

  const email =
    usuario.EMAIL ||
    usuario.email ||
    'Não informado';

  const status =
    usuario.STATUS ||
    usuario.status ||
    'Não informado';

  document.getElementById(
    'nomeUsuario'
  ).textContent = nome;

  document.getElementById(
    'cargoUsuario'
  ).textContent = cargo;

  document.getElementById(
    'perfilNome'
  ).textContent = nome;

  document.getElementById(
    'perfilCargo'
  ).textContent = cargo;

  document.getElementById(
    'perfilEscola'
  ).textContent = escola;

  document.getElementById(
    'perfilEmail'
  ).textContent = email;

  document.getElementById(
    'perfilStatus'
  ).textContent = status;

}

window.onload =
  carregarPerfil;
