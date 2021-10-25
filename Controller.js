const express = require('express');
const cors = require('cors');
const app = express();


const models = require('./models');
app.use(cors());
app.use(express.json());

let cliente = models.Cliente;
let itempedido = models.ItemPedido;
let pedido = models.Pedido;
let servico = models.Servico;



app.get('/', function(req,res){
    res.send('Olá, mundo')
});

app.post('/servicos',async(req,res)=>{
    await servico.create(
        req.body   
    ).then(function(){
        return res.json({
            error: false,
            message: 'Serviço criado com sucesso!'
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Foi impossivel se conectar.'
        })   
    });
});

app.get('/clientes', async(req,res)=>{
    await cliente.create({
        nome: 'Thiago',
        endereco: 'Faria lemos',
        cidade: 'Ivatuba',
        uf: 'PR',
        nascimento: '02/06/04',
        clienteDesde: new Date()
    });
    res.send('Cliente registrado com sucesso!');
});

app.get('/pedidos', async (req,res)=>{
    await pedido.create({
        data: new Date() 
    });
    res.send('Pedido registrado com sucesso.')
});

app.get('/itempedido', async(req,res)=>{
    await itempedido.create({
        quatidade: '1',
        valor: '10.50'
    });
    res.send('Registrado');
});




let port = process.env.PORT || 3001;

app.listen(port,(req,res)=>{
    console.log('Servidor ativo: http://localhost:3001');
});