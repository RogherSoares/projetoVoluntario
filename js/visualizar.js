const lista = document.getElementById("listaNecessidades");
const pesquisa = document.getElementById("pesquisa");
const filtro = document.getElementById("filtroTipoAjuda");

let necessidades = JSON.parse(localStorage.getItem("necessidades")) || [];

function criarCard(n, idx) {
    return `
    <div class="card">
      <button class="btn-excluir" data-id="${idx}" title="Excluir necessidade">&times;</button>
      <h3 class="card-titulo">${n.titulo}</h3>
      <div class="card-info">
        <p>${n.instituicao}</p>
        <p> ${n.tipoAjuda}</p>
        <p>${n.descricao}</p>
      </div>
      <hr class="card-divider">
      <div class="card-endereco">
        <p><strong>Endereço:</strong></p>
        <p>
          ${n.rua ? n.rua + ', ' : ''}${n.numero ? n.numero + ' - ' : ''}<br>${n.bairro ? n.bairro + ', ' : ''}<br>
          ${n.cidade ? n.cidade + ' - ' : ''}${n.estado ? n.estado : ''}
          ${n.cep ? '<br>CEP: ' + n.cep : ''}
          ${n.complemento ? '<br>' + n.complemento : ''}
        </p>
      </div>
      <div class="card-contato">
        <p><strong>Contato:</strong> <br>${n.contato}</p>
      </div>
    </div>
  `;
}

function renderizarLista(filtradas = necessidades) {
    lista.innerHTML = filtradas.map((n, idx) => criarCard(n, idx)).join("") || "<p>Nenhuma necessidade encontrada.</p>";

    // Adiciona eventos aos botões de excluir
    document.querySelectorAll('.btn-excluir').forEach(btn => {
        btn.addEventListener('click', function () {
            const id = Number(this.getAttribute('data-id'));
            if (confirm('Tem certeza que deseja excluir esta necessidade?')) {// confirma a exclusão
                necessidades.splice(id, 1);// remove a necessidade do array
                localStorage.setItem("necessidades", JSON.stringify(necessidades));
                renderizarLista();// atualiza a lista renderizada
            }
        });
    });
}

function filtrar() {
    const texto = pesquisa.value.toLowerCase();// converte o texto da pesquisa para minúsculas
    const tipo = filtro.value;// obtém o valor do filtro de tipo de ajuda

    // Filtra as necessidades com base no texto e no tipo de ajuda
    const resultado = necessidades.filter(n =>
        (n.titulo.toLowerCase().includes(texto) || n.descricao.toLowerCase().includes(texto)) &&
        (tipo === "" || n.tipoAjuda === tipo)// verifica se o tipo de ajuda é igual ao selecionado ou se não há filtro
    );

    renderizarLista(resultado);
}

pesquisa.addEventListener("input", filtrar);
filtro.addEventListener("change", filtrar);

//renderiza a lista inicial
renderizarLista();