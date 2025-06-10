const form = document.getElementById("formNecessidade");
const cepInput = document.getElementById("cep");

cepInput.addEventListener("blur", async () => {
  const cep = cepInput.value.replace(/\D/g, "");
  if (cep.length !== 8) return;

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

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