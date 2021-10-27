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

//Cria um serviço pelo metodo post
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

//Adiciona mu cliente pelo metodo post
app.post('/clientes', async(req,res)=>{
    await cliente.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            massage: 'Cliente adicionado com sucesso! '
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            massage: 'Foi impossivel se conectar.'
        })
    });
});

//Registra um pedido pelo metodo post
app.post('/pedidos', async(req,res)=>{
    await pedido.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            massage: 'Pedido criado com sucesso!'
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            massage: 'Foi imposivel se conectar.'
        })
    });
});

//Cria a classe asociativa 
app.post('/itempedido', async(req,res)=>{
    await itempedido.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            massage: 'Sucesso!'
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            massage: 'Foi imposivel se conectar.'
        })
    });
});


app.get('/listaservicos', async(req,res)=>{
    await servico.findAll({
        //raw: true
        order:[['nome', 'DESC']]
    }).then(function(servicos){
        res.json({servicos})
    });
});


app.get('/ofertaservicos', async(req,res)=>{
    await servico.count('id').then(function(servicos){
        res.json({servicos});
    });
});


let port = process.env.PORT || 3001;

app.listen(port,(req,res)=>{
    console.log('Servidor ativo: http://localhost:3001');
});