document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("endereco").value = localStorage.getItem("endereco");
    document.getElementById("bairro").value = localStorage.getItem("bairro");
    document.getElementById("cidade").value = localStorage.getItem("cidade");
    document.getElementById("estado").value = localStorage.getItem("estado");
});

function validaCep() {
    const cepInformado = document.getElementById("cep").value;

    if (!(cepInformado.length === 8)) {
        return;
    } else {
        fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
            .then(res => res.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById("endereco").value = data.logradouro;
                    document.getElementById("bairro").value = data.bairro;
                    document.getElementById("cidade").value = data.localidade;
                    document.getElementById("estado").value = data.uf;

                    localStorage.setItem("endereco", data.logradouro);
                    localStorage.setItem("bairro", data.bairro);
                    localStorage.setItem("cidade", data.localidade);
                    localStorage.setItem("estado", data.uf);
                } else {
                    alert("CEP não encontrado.");
                }
            })
            .catch(err => console.log("Erro ao buscar CEP.", err));
    }
}
