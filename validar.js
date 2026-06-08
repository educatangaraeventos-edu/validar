const API_URL =

'https://script.google.com/macros/s/AKfycbxISKb7Sq5bkEYIcs8DTElxV8D93fsfbPZDd1fIlQM-CBl-hoSRb82fk08TY1m9fAtx/exec';

const parametros =

  new URLSearchParams(
    window.location.search
  );

const id =

  parametros.get('id');

function formatarData(dataIso) {

  return new Date(
    dataIso
  ).toLocaleDateString(
    'pt-BR'
  );

}

function mostrarErro() {

  document.getElementById(
    'resultado'
  ).innerHTML = `

    <div class="card erro">

      <div class="titulo erro">

        ❌ Certificado não encontrado

      </div>

      <p>

        O certificado informado não existe
        ou foi invalidado pelo sistema.

      </p>

    </div>

  `;

}

function mostrarCertificado(
  dados
) {

  document.getElementById(
    'resultado'
  ).innerHTML = `

    <div class="card sucesso">

      <div class="titulo sucesso">

        ✅ Certificado Autêntico

      </div>

      <div class="info">

        <strong>Código:</strong>

        ${dados.idCertificado}

      </div>

      <div class="info">

        <strong>Nome:</strong>

        ${dados.nome}

      </div>

      <div class="info">

        <strong>CPF:</strong>

        ${dados.cpf}

      </div>

      <div class="info">

        <strong>Tipo:</strong>

        ${dados.tipo}

      </div>

      <div class="info">

        <strong>Carga Horária:</strong>

        ${dados.cargaHoraria} h

      </div>

      <div class="info">

        <strong>Ano:</strong>

        ${dados.ano}

      </div>

      <div class="info">

        <strong>Data de Emissão:</strong>

        ${formatarData(
          dados.dataEmissao
        )}

      </div>

      <div class="status">

        Status: AUTÊNTICO

      </div>

    </div>

  `;

}

async function carregar() {

  try {

    const resposta =

      await fetch(

        API_URL +

        '?action=validarCertificado&id=' +

        encodeURIComponent(id)

      );

    const dados =

      await resposta.json();

    if (

      !dados.valido

    ) {

      mostrarErro();

      return;

    }

    mostrarCertificado(
      dados
    );

  }

  catch (erro) {

    mostrarErro();

  }

}

carregar();
