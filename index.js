const API_URL =

'https://script.google.com/macros/s/AKfycbxISKb7Sq5bkEYIcs8DTElxV8D93fsfbPZDd1fIlQM-CBl-hoSRb82fk08TY1m9fAtx/exec';

function consultarPermissao(
  email
) {

  return new Promise(

    (resolve, reject) => {

      const callbackNome =

        'callback_' +

        Date.now();

      window[callbackNome] =

        function(dados) {

          resolve(dados);

          delete window[callbackNome];

          script.remove();

        };

      const script =

        document.createElement(
          'script'
        );

      script.src =

        API_URL +

        '?action=permissaoEmail' +

        '&email=' +

        encodeURIComponent(
          email
        ) +

        '&callback=' +

        callbackNome;

      script.onerror =

        function() {

          reject();

        };

      document.body.appendChild(
        script
      );

    }

  );

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

  function mostrarLogin() {

document.getElementById(
'loginContainer'
).style.display = 'block';

document.getElementById(
'menu'
).style.display = 'none';

}

function carregarSistema() {

const usuario = JSON.parse(

```
localStorage.getItem(
  'usuario'
)
```

);

if (!usuario) {

```
mostrarLogin();

return;
```

}

document.getElementById(
'usuarioArea'
).innerHTML = `

```
<div class="usuario-email">

  ${usuario.email}

</div>

<div class="usuario-perfil">

  ${usuario.perfil}

</div>

<br>

<button
  class="btn btn-vermelho"
  onclick="sair()">

  Sair

</button>
```

`;

document.getElementById(
'loginContainer'
).style.display = 'none';

document.getElementById(
'menu'
).style.display = 'grid';

}

window.onload = () => {

const usuario =

```
localStorage.getItem(
  'usuario'
);
```

if (usuario) {

```
carregarSistema();
```

} else {

```
mostrarLogin();
```

}

};

};
