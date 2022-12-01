const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./dbConnection.js').connection;
const testConnect = require('./dbConnection.js').testConnect;

const app = express();
const port = 8081;
let count = 0;

app.use(express.static(__dirname+"/"));
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.sendFile(__dirname+"/pedido.html");
    testConnect();
});

app.get("/user/:id", (req, res) => {
    const userId = req.params.id;

    testConnect();
    connection.query(`select user.nome as nome, endereco.rua, endereco.bairro from user
    inner join endereco
    on user.FK_endereco = endereco.id
    where user.id = ${userId};`, (err, rows) => {
        if (err) console.log("erro ao pegar usuário --> ", err);

        res.send(rows);
    });
});

app.post("/cadastrar-user", async (req, res) => {
    const body = req.body;
    console.log("body --> ", body);
    testConnect();

    body.endereco? body.endereco = JSON.parse(body.endereco) : '';

    let endereco = body.endereco? {
        cep: body.cep,
        rua: body.endereco.logradouro,
        bairro: body.endereco.bairro,
        cidade: body.endereco.localidade,
        estado: body.endereco.uf,
        pais: "Brasil"
    } : null;

    let user = {
        nome: body.nome,
        cpf: body.cpf,
        sobrenome: body.sobrenome,
        nascimento: body.datanascimento,
        FK_endereco: count
    }

    count++;

    if(endereco == null || endereco == undefined) {
        console.log('deu erro no endereco');
        //window.alert("erro")
        return new Error('endereco não pode ser null')
    }

    connection.query("insert into endereco set ?", endereco, (err, savedEndereco)=>{
        if(err){
            console.log("erro ao cadastrar endereco --> ", err);
        }else{
            console.log("cadastrado!", savedEndereco);
            user.FK_endereco = savedEndereco.insertId;

            connection.query("insert into user set ?", user, (err, savedUser)=>{
                if(err){
                    console.log("erro ao cadastrar user --> ", err);
                }else{
                    console.log("cadastrado!");
                    req.body = '';
                    res.cookie('access_token', 'User_id: ' + savedUser.id, {
                        expires: new Date(Date.now() + 24 * 3600000) // cookie expira em 24 horas
                      })
                      
                    res.sendFile(__dirname+"/cardapio.html");
                }
            })
        }
    })
    
    
});

app.post("/fazer-pedido", (req, res) => {
    const body = req.body;
     
});



app.listen(port, () => {
    console.log(`servidor on! http://localhost:${port}`);
})