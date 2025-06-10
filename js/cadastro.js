const form = document.getElementById("formNecessidade");
const cepInput = document.getElementById("cep");

let necessidades = JSON.parse(localStorage.getItem("necessidades")) || [];// recupera as necessidades do localStorage ou inicializa como um array vazio

cepInput.addEventListener("blur", async () => {
  const cep = cepInput.value.replace(/\D/g, "");
  if (cep.length !== 8) return;

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);// faz a requisição para a API de CEPs
    const data = await response.json();// converte a resposta em JSON

    // Verifica se a resposta contém erro
    if (!data.erro) {
      document.getElementById("rua").value = data.logradouro;
      document.getElementById("bairro").value = data.bairro;
      document.getElementById("cidade").value = data.localidade;
      document.getElementById("estado").value = data.uf;
    }
  } catch (err) {
    alert("Erro ao buscar o CEP.");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();// evita o envio padrão do formulário

  // Coleta os dados do formulário e cria um objeto necessidade
  const formData = new FormData(form);
  const necessidade = Object.fromEntries(formData.entries());

  necessidades.push(necessidade);// adiciona a nova necessidade ao array
  localStorage.setItem("necessidades", JSON.stringify(necessidades));// salva no localStorage

  // Exibe uma mensagem de sucesso e reseta o formulário
  alert("Necessidade cadastrada com sucesso!");
  form.reset();
});