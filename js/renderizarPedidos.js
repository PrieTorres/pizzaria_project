async function renderizarPedidos() {
    const container = document.body.querySelector(".pedidos");

    const pedidos = [];
    let date = new Date();
    let html_txt;

    await fetch("/pedidos")
    .then(res => res.json())
    .then(data => pedidos.push(...data));

    console.log(pedidos);

    


    pedidos.forEach((pedido, i) => {
        let pizzas_txt = "";
        date = new Date(pedido.data);

        pedido.itens.forEach((pizza, ii) => {
            pizzas_txt += `
            <div class="caixa">${ii}</div>
            <h1>${pizza}</h1>
            `
        });
        let dia_sem;

        switch(date.getDay()){
            case 0:
                dia_sem = "Seg"
                break;
            case 1:
                dia_sem = "Ter"
                break;
            case 2:
                dia_sem = "Qua"
                break;
            case 3:
                dia_sem = "Qui"
                break;
            case 4:
                dia_sem = "Sex"
                break;
            case 5:
                dia_sem = "Sab"
                break;
            case 6:
                dia_sem = "Dom"
                break;
        }

        let data_txt = `${dia_sem}, ${date.getDate()}/${date.getMonth()+1}     ${date.getFullYear()}`
        
        html_txt += `
        <div class="pedido">
            <div class="container-3">
                <div class="container">
                    <img src="./img/burguer-king.png" alt="Burguer King">
                    <h1>CSS' Pizza</h1>
                    <h1 class="descricao-2">${data_txt}</h1>
                </div>
                <hr>
                <div class="container-3-1">
                    ${pizzas_txt}
                </div>
                <hr>
                <div class="container-3-2">
                    <h1 class="avaliacao">Avaliação</h1>
                    <img src="./img/estrela.png" alt="Estrela png">
                    <img src="./img/estrela.png" alt="Estrela png">
                    <img src="./img/estrela.png" alt="Estrela png">
                    <img src="./img/estrela.png" alt="Estrela png">
                    <img src="./img/estrela.png" alt="Estrela png">
                </div>
            </div>
        </div>
        `;
    });


    container.innerHTML=html_txt;
}