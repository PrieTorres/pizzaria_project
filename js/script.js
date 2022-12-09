const c = (ele) => document.querySelector(ele);//função de apoio para ter menos linha de código
//"ele" é de elemento
function ca(ele) {//outra forma de fazer a função acima mas com o selectorall
    return document.querySelectorAll(ele);
}    
let ModalKey = 0;
let cart = [];
let NumPizza = 1;
let pizzaQuant = 1;

let InfoNP = document.querySelector('.pizzaWindowArea .pizzaInfo--pricearea .pizzaInfo--qt');
InfoNP.innerHTML = NumPizza;

    document.querySelector('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
            if(NumPizza>0){
                NumPizza -= 1;
                InfoNP.innerHTML = NumPizza;
            }else{
                NumPizza = 0;
                InfoNP.innerHTML = NumPizza;
            };
            pizzaQuant = NumPizza;
            return pizzaQuant;
    });
        
    document.querySelector('.pizzaInfo--qtmais').addEventListener('click', ()=>{
            if(NumPizza<50){
                if(NumPizza == 0){
                    NumPizza = 1;
                    InfoNP.innerHTML = NumPizza;
                }else{
                NumPizza += 1;
                InfoNP.innerHTML = NumPizza;
                }
            };
            pizzaQuant = NumPizza;
            return pizzaQuant;
    });


//Listagem das pizzas logo abaixo
pizzaJson.map((item, i)=>{//a cada item"pizza" i é o index
    //console.log(item) daria 7 consoles mostrando cada pizza

    //clonar item
    let pizzaItem = c('.models .pizza-item').cloneNode(true);
    //append ao invés de innerhtml faz adicionar, o inner substituiria
    /*document.querySelector('.pizza-area').append(pizzaItem);*/ //até aqui temos os itens mas sem as informaçoes deles

    //aqui vai preencher as informaçoes básicas
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$:${item.price[0].toFixed(2)}`

    pizzaItem.querySelector('.pizza-item--img img').src = item.img;

    pizzaItem.setAttribute('data-key',i);//pra saber em que pizza clicou
    
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();//tira as codiçoes normais da tag a
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        ModalKey = key;
        let keyT = 0;
        

        
        c('.pizzaInfo--size.selected').classList.remove('selected');

        ca('.pizzaInfo--size').forEach((size, sI)=>{//para cada pizzaInfo--size
            let tamanho = pizzaJson[key].sizes[sI]
            size.querySelector('span').innerHTML = tamanho
            if(sI == 0){
                size.classList.add('selected');
            }

        })
        

        //window.alert(pizzaJson[key].name)
        c('.pizzaWindowArea .pizzaInfo h1').innerHTML = pizzaJson[key].name
        c('.pizzaWindowArea img').src = pizzaJson[key].img
        c('.pizzaWindowArea .pizzaInfo--desc').innerHTML = pizzaJson[key].description
        c('.pizzaWindowArea .pizzaInfo--actualPrice').innerHTML = `R$:${pizzaJson[key].price[keyT].toFixed(2)}`

        c('.pizzaWindowArea').style.display = 'flex';
        c('.pizzaWindowArea').style.opacity = 0;
        setTimeout(()=>{
            c('.pizzaWindowArea').style.opacity = 1;
        },200);
        
        return ModalKey;
    });

    //aqui que faz aparecer tudo
    document.querySelector('.pizza-area').append(pizzaItem);
    return ModalKey;
});



//eventos do modal
let itemP = 0
ca('.pizzaInfo--size').forEach((size)=>{//para cada pizzaInfo--size
    size.addEventListener('click',()=>{
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
        let PizzaTamP = c('.pizzaInfo--size.selected').getAttribute('data-key');
        keyT = PizzaTamP;
        c('.pizzaWindowArea .pizzaInfo--actualPrice').innerHTML = `R$:${pizzaJson[ModalKey].price[keyT].toFixed(2)}`;
        itemP = Number(pizzaJson[ModalKey].price[keyT].toFixed(2));
        return itemP;
    });
});

function fecharM(){
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        c('.pizzaWindowArea').style.display = 'none';
    }, 1000);
    NumPizza = 1;
    pizzaQuant = 1;
    InfoNP.innerHTML = NumPizza;
};

document.querySelector('.pizzaInfo--cancelButton').addEventListener('click', () => {
    fecharM();
});
document.querySelector('.pizzaInfo--cancelMobileButton').addEventListener('click', () => {
    fecharM();
});
let total = 0;

c('.pizzaInfo--addButton').addEventListener('click', () => {
    let PizzaTamP = c('.pizzaInfo--size.selected').getAttribute('data-key');
    keyT = PizzaTamP;
    let ident = `${pizzaJson[ModalKey].id}@${keyT}`
    
    itemP = Number(pizzaJson[ModalKey].price[keyT].toFixed(2));
    
    let keyy = cart.findIndex((item)=>{
        return item.ident == ident
    });

    if(keyy>-1){
       cart[keyy].qt += pizzaQuant;
    }else{
        cart.push({
            ident: ident,
            id:pizzaJson[ModalKey].id,
            size:pizzaJson[ModalKey].sizes[keyT],
            qt:pizzaQuant,
            pricePizza: itemP,
            price: (itemP*pizzaQuant).toFixed(2)
        });
    };
        
        total += itemP*pizzaQuant;

        
    updateCart();
    fecharM();
});

//mobile ------------->
c('.menu-openner').addEventListener('click', ()=>{
    if(cart.length>0){
        c('aside').style.left = '0';
    }
})
c('.menu-closer').addEventListener('click', ()=>{
    c('aside').style.left = '100vw';
})
function updateCart(){
    //mobile ------------->
    c('.menu-openner span').innerHTML = cart.length;





    //desktop -------------->
    if (cart.length > 0){
        c('aside').classList.add('show');
        c('.cart').innerHTML = "";

        let subtotal = 0;
        let desconto = 0;
        let total = 0;


        for(let i in cart){//aqui faz a busca das pizzas dentro do carrinho, uma por uma para mostrar as pizzas adicionadas
                let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id);


                //adicionando os preços no carrinho
                let quantidade = Number(cart[i].qt)
                let precoP = Number(cart[i].price)

                subtotal += precoP*quantidade;
                //ao fim do for continua
        
                let cartItem = c('.models .cart--item').cloneNode(true);

                let pizzaSizeName = cart[i].size

                let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

                cartItem.querySelector('img').src = pizzaItem.img;
                cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
                cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

                //funções dos botões de mais e de menos
                cartItem.querySelector(".cart--item-qtmenos").addEventListener('click', ()=>{
                    if(cart[i].qt>1){
                    cart[i].qt--;
                    updateCart();
                    }else{
                        //vai remover a pizza do carrinho se a quantidade de pizza for igual a zero
                        cart.splice(i, 1);
                        updateCart();
                    }
                })
                cartItem.querySelector(".cart--item-qtmais").addEventListener('click', ()=>{
                    cart[i].qt++;
                    updateCart();
                })

                //preços carrinho soma
                desconto = subtotal * 0.1;
                total = subtotal - desconto;
                //------------------

                //adicionando no HTML
                c('.subtotal span:last-child').innerHTML = `R$:${subtotal.toFixed(2)}`;
                c('.desconto span:last-child').innerHTML = `R$:${desconto.toFixed(2)}`;
                c('.total span:last-child').innerHTML = `R$:${total.toFixed(2)}`;
                //------------------
                


                c('.cart').append(cartItem);
        }


    }else{
        c('aside').classList.remove('show');
        c('aside').style.left = '100vw'//faz com que feche o menu no mobile
    }
}

async function comprarPizzas(){
    if(localStorage.getItem("user")==undefined){
        alert("voce precisa se cadastrar para poder comprar pizzas ;((");
    }else{
        let user = JSON.parse(localStorage.getItem("user"))[0];
        
        let pedido = {
            cliente: user.nome,
            endereco: `Rua: ${user.rua} Bairro:${user.bairro}`,
            itens: [],
            preco: 0
        };

        cart.forEach(item => {
            pizzaJson.forEach(pizza => {
                if(item.id == pizza.id){
                    pedido.itens.push(`${pizza.name} (${item.size})`);
                }
            })
        })

        cart.forEach(item => {pedido.preco+=item.price*item.qt})

        localStorage.setItem("carrinho", JSON.stringify(cart));
        localStorage.setItem("pedido", JSON.stringify(pedido));

        openModalPedido();
    }
}

function openModalPedido(){
    const pedido = JSON.parse(localStorage.getItem("pedido"));
    const cliente = JSON.parse(localStorage.getItem("user"))[0];

    let html = `
    <div class="modal_pedido">
        <p>Nome: ${cliente.nome}</p>
        <p>Endereço: ${cliente.rua} - ${cliente.bairro}</p>
        <p>Itens: ${JSON.stringify(pedido.itens)}</p>
        <p>Total: R$ ${pedido.preco}</p>

        <button onclick="fazerPedido()">Pedir!</button>
    </div>
    `

    document.body.innerHTML += html;
}

