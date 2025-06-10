const lista = document.getElementById("listaNecessidades");
const pesquisa = document.getElementById("pesquisa");
const filtro = document.getElementById("filtroTipoAjuda");

let necessidades = JSON.parse(localStorage.getItem("necessidades")) || [];

function criarCard(n) {
  return `
    <div class="card">
      <h3>${n.titulo}</h3>
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

renderizarLista();