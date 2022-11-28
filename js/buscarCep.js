function buscarCepComClasse(classe) {
    const input = document.body.querySelector(`.${classe}`);

    input.addEventListener('keypress', e => {
        const container = document.body.querySelector('#infosCep');
        const input_endereco = document.body.querySelector(".endereco-input");
        let cep = e.target.value + e.key;
        
        if(cep.length == 8){
            console.log('buscando...', cep)
            let url = `https://viacep.com.br/ws/${cep}/json/`
            let request = new XMLHttpRequest();

            request.open('GET', url);
            request.onerror = (err) => {
                window.alert('não foi possível buscar o cep descrito');
                console.log("error --> ", err);
                return;
            }


            request.onload = () => {
                let res = JSON.parse(request.responseText);

                container.classList.remove('text-danger');
                //container.innerHTML = `${res}`;
                //<h2>Confira se o endereço abaixo etá correto</h2>

                localStorage.setItem('endereco', JSON.stringify(res));
                input_endereco.value = JSON.stringify(res);
                container.innerHTML = `
                <p>Bairro: ${res.bairro}</p>
                <p>Logradouro: ${res.logradouro}</p>
                <p>Localidade: ${res.localidade} / ${res.uf}</p>
                `.replace(/ /g,'')
            }

            request.send();
        }else{
            input_endereco.value = "";
            container.classList.add('text-danger');
            container.innerHTML = 'Endereço não encontrado';
        }
    })
}

function buscarCep(cep) {
    console.log(cep)
    const container = document.body.querySelector('#infosCep');
    if(cep.length == 8){
        console.log('buscando...', cep)
        let url = `https://viacep.com.br/ws/${cep}/json/`
        let request = new XMLHttpRequest();

        request.open('GET', url);
        request.onerror = (err) => {
            window.alert('não foi possível buscar o cep descrito');
            console.log("error --> ", err);
            return;
        }


        request.onload = () => {
            let res = JSON.parse(request.responseText);

            container.classList.remove('text-danger');
            //container.innerHTML = `${res}`;
            //<h2>Confira se o endereço abaixo etá correto</h2>

            localStorage.setItem('endereco', JSON.stringify(res));
            container.innerHTML = `
            <p>Bairro: ${res.bairro}</p>
            <p>Logradouro: ${res.logradouro}</p>
            <p>Localidade: ${res.localidade} / ${res.uf}</p>
            `.replace(/ /g,'')
        }

        request.send();
    }else{
        container.classList.add('text-danger');
        container.innerHTML = 'Endereço não encontrado';
    }
}