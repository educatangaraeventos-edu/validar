const API_URL =

'https://script.google.com/macros/s/AKfycbxISKb7Sq5bkEYIcs8DTElxV8D93fsfbPZDd1fIlQM-CBl-hoSRb82fk08TY1m9fAtx/exec';

const parametros =

  new URLSearchParams(
    window.location.search
  );

const id =

  parametros.get('id');

async function carregar() {

  const resposta =

    await fetch(

      API_URL +

      '?action=validarCertificado&id=' +

      encodeURIComponent(id)

    );

  const dados =

    await resposta.json();

  const div =

    document.getElementById(
      'resultado'
    );

  if (!dados.valido) {

    div.innerHTML = `

      <div class="card invalido">

        <div class="titulo">

          ❌ Certificado não encontrado

        </div>

        <p>

          O certificado informado não existe.

        </p>

      </div>

    `;

    return;

  }

  const data =

    new Date(
      dados.dataEmissao
    ).toLocaleDateString(
      'pt-BR'
    );

  div.innerHTML = `

    <div class="card valido">

      <div class="titulo">

        ✅ Certificado Autêntico

      </div>

      <div class="linha">
        <span class="rotulo">
          Código:
        </span>
        ${dados.idCertificado}
      </div>

      <div class="linha">
        <span class="rotulo">
          Nome:
        </span>
        ${dados.nome}
      </div>

      <div class="linha">
        <span class="rotulo">
          CPF:
        </span>
        ${dados.cpf}
      </div>

      <div class="linha">
        <span class="rotulo">
          Tipo:
        </span>
        ${dados.tipo}
      </div>

      <div class="linha">
        <span class="rotulo">
          Carga Horária:
        </span>
        ${dados.cargaHoraria} h
      </div>

      <div class="linha">
        <span class="rotulo">
          Ano:
        </span>
        ${dados.ano}
      </div>

      <div class="linha">
        <span class="rotulo">
          Data de Emissão:
        </span>
        ${data}
      </div>

      <div class="rodape">

        Secretaria Municipal de Educação

        <br>

        Tangará da Serra - MT

      </div>

    </div>

  `;

}

carregar();
