const lista = document.getElementById("listaNecessidades");
const pesquisa = document.getElementById("pesquisa");
const filtro = document.getElementById("filtroTipoAjuda");

let necessidades = JSON.parse(localStorage.getItem("necessidades")) || [];

function criarCard(n) {
    return `
    <div class="card">
      <h3 class="card-titulo">${n.titulo}</h3>
      <p><strong>Instituição:</strong> ${n.instituicao}</p>
      <p><strong>Tipo de Ajuda:</strong> ${n.tipoAjuda}</p>
      <p><strong>Descrição:</strong> ${n.descricao}</p>
      <p><strong>Local:</strong> ${n.cidade}/${n.estado}</p>
      <p><strong>Contato:</strong> ${n.contato}</p>
    </div>
  `;
}

function renderizarLista(filtradas = necessidades) {
    lista.innerHTML = filtradas.map(criarCard).join("") || "<p>Nenhuma necessidade encontrada.</p>";
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