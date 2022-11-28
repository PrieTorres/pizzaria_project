async function cadastrarCliente(e){
    //if(e) e.target.preventDefault();

    const nomeInput = document.querySelector("#input-nome")
    const emailInput = document.querySelector("#input-sobrenome")
    //const telInput = document.querySelector("#input-telefone")
    const enderecoInput = document.querySelector("#input-endereco")

    const cliente = {
        nome: nomeInput.value,
        email: emailInput.value,
        endereco: enderecoInput.value,
        //telefone: telInput.value,
    }

    localStorage.setItem("cliente", JSON.stringify(cliente));
    
    await fetch('/cadastrar-user', {
        method:"post"
    });
}