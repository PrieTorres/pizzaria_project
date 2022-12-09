async function fazerPedido() {
    let carrinho = JSON.parse(localStorage.getItem("pedido"));
    let endereco = JSON.parse(localStorage.getItem("endereco"))

    var payload = {
        endereco: JSON.stringify(endereco),
        itens: JSON.stringify(carrinho.itens)
    };
    
    var data = new FormData();
    data.append( "json", JSON.stringify( payload ) );
    
    await fetch(`/fazer-pedido?endereco=${payload.endereco}&&itens=${payload.itens}`,
    {
        method: "get",
    })
    .then(function(res){ return res.json(); })
    .then(function(data){ alert( JSON.stringify( data ) ) })
}