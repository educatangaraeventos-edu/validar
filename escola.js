const API_URL =

'https://script.google.com/macros/s/AKfycbxISKb7Sq5bkEYIcs8DTElxV8D93fsfbPZDd1fIlQM-CBl-hoSRb82fk08TY1m9fAtx/exec';

async function carregar() {

  const resposta =

    await fetch(

      API_URL +

      '?action=servidoresEscola&escola=SEMEC'

    );

  const dados =

    await resposta.json();

  document
    .getElementById(
      'info'
    )
    .innerHTML =

      dados.length +

      ' servidores encontrados';

  const tbody =

    document.querySelector(
      '#tabela tbody'
    );

  dados.forEach(

    servidor => {

      tbody.innerHTML += `

        <tr>

          <td>${servidor.nome}</td>

          <td>${servidor.cargo}</td>

          <td>${servidor.email}</td>

          <td>${servidor.escola}</td>

        </tr>

      `;

    }

  );

}

carregar();
