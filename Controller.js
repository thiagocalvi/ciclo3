const express = require('express');
const cors = require('cors');
const app = express();
const models = require('./models');
const {Sequelize} = require('./models');
const { where } = require('sequelize/types');

app.use(cors());
app.use(express.json());

let cliente = models.Cliente;
let pedido = models.Pedido;
let compra = models.Compra;
let servico = models.Servico;
let produto = models.Produto;
let itempedido = models.ItemPedido;
let itemcompra = models.ItemCompra;

//Raiz
app.get('/', (req, res)=>{
    res.send('Sejá bem vindo!');
});


//Inserir novo cliente
app.post('/cliente', async(req,res)=>{
    await cliente.create(
        req.body   
    ).then(cli=>{
        return res.json({
            error: false,
            message: 'Cliente foi iserido com sucesso!',
            cli
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: 'Não foi possivel inserir o cliente.'
        });
    });
});

//Inserir novo serviço
app.post('/servicos', async(req,res)=>{
    await servico.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            massage: 'Cliente adicionado com sucesso! '
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            massage: 'Foi impossivel se conectar.'
        });
    });
});

//inserir produto
app.post('/produto', async function(req,res){
    await produto.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            massage: 'Produto adicionado com sucesso!'
        });
    }).catch(function(erro){
        return res.json({
            error: true,
            massage: 'Foi impossivel se conectar.'
        });
    });
});

//Inserir pedidos
app.post('/cliente/:id/pedido', async(req,res)=>{
    const ped = {
        ClienteId: req.params.id,
        dataPedido: req.body.dataPedido
    };

    if(!await cliente.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            massage: 'Cliente não existe'
        });
    };
    await pedido.create(ped)
    .then(order => {
        return res.json({
            error: false,
            massage: 'Pedido inserido com sucesso',
            order
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            massage: 'Não foi possivel inserir o pedido'
        });
    });
});

//Inserir compra
app.post('/cliente/:id/compra', async(req,res)=>{
    const com = {
        ClienteId: req.params.id,
        data: req.body.data
    };

    if(!await compra.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            massage: 'Compra não existe'
        });
    };
    await compra.create(com)
    .then(order => {
        return res.json({
            error: false,
            massage: 'Pedido inserido com sucesso',
            order
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            massage: 'Não foi possivel inserir a compra'
        });
    });
});

//Inserir itempedido
app.post('/itempedido', async(req,res)=>{
    await itempedido.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            massage: 'Sucesso!'
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            massage: 'Foi imposivel se conectar.'
        });
    });
});

//Inserir itemcompra
app.post('/itemcompra', async(req,res)=>{
    await itemcompra.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            massage: 'Sucesso!'
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            massage: 'Foi imposivel se conectar.'
        });
    });
});

//LISTAR 
//Listar clientes
app.get('/listaclientes', async function(req, res){
    await cliente.findAll()
    .then(cli =>{
        return res.json({
            error: false,
            cli
        });
    }).catch((erro)=>{
        return res.status(400).json({
            error: true,
            massage: 'Erro de conexão'
        });
    });
});

//lista tudo relacionado ao cliente
app.get('/clientes-pedidos', async function(req, res){
    await cliente.findAll({include:[{all: true}]})
    .then(cli=>{
        return res.json({
            error: false,
            cli
        });
    }).catch((erro)=>{
        return res.status(400).json({
            error: true,
            massage: 'Erro de conexão'
        });
    });
});

//Listar pedidios
app.get('/listapedidos', async function(req,res){
    await pedido.findAll()
    .then(ped =>{
        return res.json({
            error: false,
            ped
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            massage: 'Erro de conexão'
        });
    });
});

//Listar compras
app.get('/listacompras', async function(req,res){
    await compra.findAll()
    .then(com =>{
        return res.json({
            error: false,
            com
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            massage: 'Erro de conexão'
        });
    });
});

//Listar serviços
app.get('/listaservicos', async function(req, res){
    await servico.findAll()
    .then(ser => {
        return res.json({
            erro: false,
            ser
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            massage: 'Erro de conexão'
        });
    });
});

//Listar produtos
app.get('/listaprodutos', async function(req, res){
    await produto.findAll()
    .then(pro => {
        return res.json({
            erro: false,
            pro
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            massage: 'Erro de conexão'
        });
    });
});

//Listar ItemPedido
app.get('/listaitempedido', async function(req, res){
    await itempedido.findAll()
    .then(itp => {
        return res.json({
            error: false,
            itp
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            massage: 'Erro de conexão'
        });
    });
});

//Lista ItemCompra
app.get('/listaitemcompra', async function(req, res){
    await itemcompra.findAll()
    .then(itc => {
        return res.json({
            error: false,
            itc
        });
    }).catch(erro =>{
        return res.status(400).json({
            error: true,
            massage: 'Erro de conexão'
        });
    });
});

//ATUALIZAR
//Atualiza cliente
app.put('/cliente/:id', async function(req, res){
    const cli = {
        id: req.body.id,
        nome: req.body.nome,
        enderoco: req.body.enderoco,
        cidade: req.body.cidade,
        uf: req.body.uf,
        nascimento: req.body.nascimento,
    }
    if(!await cliente.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            massage: 'Cliente não existe.'
        });
    }
    await cliente.update(cli,{
        where: Sequelize.and({id: req.params.id}, {id: req.body.id})
    }).then(clientes=>{
        return res.json({
            error: false,
            massage: 'Cliente foi alterado com sucesso'
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            massage: 'Erro: não  foi pissivel alterar'
        });
    });
});

//Atuliza o pedido
app.put('/cliente/:id/pedidos', async function(req, res){
    const ped = {
        ClienteId: req.params.id,
        dataPedido: req.body.dataPedido
    }

    if(!await cliente.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            massage: 'Cliente não existe.'
        });
    };

    await pedido.update(ped,{
        where: Sequelize.and({ClienteId: req.params.id}, {id: req.body.id})
    }).then(pedidos=>{
        return res.json({
            error: false,
            massage: 'Pedido foi alterado com sucesso'
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            massage: 'Erro: não  foi pissivel alterar'
        });
    });
});

//Atualiza compra
app.put('/cliente/:id/compras', async function(req, res){
    const com = {
        data: req.body.data,
        ClienteId: req.params.id
    }
    if(!await cliente.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            massage: 'Cliente não existe.'
        });
    };

    await compra.update(com,{
        where: Sequelize.and({ClienteId: req.params.id}, {id: req.body.id})
    }).then(compras=>{
        return res.json({
            error: false,
            massage: 'Pedido foi alterado com sucesso'
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            massage: 'Erro: não  foi pissivel alterar'
        });
    });
});

//Atualiza serviço
app.put('/cliente/:id/servicos', async function(req, res){
    const ser = {
        ClienteId: req.params.id,
        nome: req.body.nome,
        descricao: req.body.descricao
    }
    if(!await servico.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            massage: 'Serviço não existe.'
        });
    };
    await servico.update(ser,{
        where: Sequelize.and({ClienteId: req.params.id}, {id: req.body.id})
    }).then(servicos=>{
        return res.json({
            error: false,
            massage: 'Serviço foi alterado com sucesso'
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            massage: 'Erro: não  foi pissivel alterar'
        });
    });

});

//Atualiza produto
app.put('/cliente/:id/produtos', async function(req, res){
    const pro = {
        ClienteId: req.params.id,
        nome: req.body.nome,
        descricao: req.body.descricao
    }
    if(!await produto.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            massage: 'Produto não existe.'
        });
    };
    await produto.update(pro,{
        where: Sequelize.and({ClienteId: req.params.id}, {id: req.body.id})
    }).then(produtos=>{
        return res.json({
            error: false,
            massage: 'Produto foi alterado com sucesso'
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            massage: 'Erro: não  foi pissivel alterar'
        });
    });

});

//Atualiza itempedido
app.put('/pedidos/:id/editaritem', async function(req, res){
    const item  = {
        valor: req.body.valor,
        quantidade: req.body.quantidade
    }
    if(!await pedido.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            massage: 'Pedido não foi encontrado'
        });
    };
    if(!await servico.findByPk(req.body.ServicoId)){
        return res.status(400).json({
            error: true,
            massage: 'Serviço não foi encontrado'
        });
    };
    await itempedido.update(item, {
        where: Sequelize.and({ServicoId: req.body.ServicoId}, {PedidoId: req.params.id})
    }).then(function(itens){
        return res.json({
            error: false,
            massage: 'Pedido foi alterado com sucesso',
            itens
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            massage: 'Não foi possivel alterar'
        });
    });
});

//Atualizar itemcompra
app.put('/compras/:id/editaritem', async function(req, res){
    const item  = {
        valor: req.body.valor,
        quantidade: req.body.quantidade
    }
    if(!await compra.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            massage: 'Compra não foi encontrado'
        });
    };
    if(!await compra.findByPk(req.body.ProdutoId)){
        return res.status(400).json({
            error: true,
            massage: 'Produto não foi encontrado'
        });
    };
    await itemcompra.update(item, {
        where: Sequelize.and({ProdutoId: req.body.ProdutoId}, {CompraId: req.params.id})
    }).then(function(itens){
        return res.json({
            error: false,
            massage: 'Compra foi alterado com sucesso',
            itens
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            massage: 'Não foi possivel alterar'
        });
    });
});


//DELETE
//Deletar cliente e tudo relacionado a ele
app.get('/escluir-clinte', async function(req, res){
    await cliente.destroy({ 
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            massage: 'Cliente escluido com sucesso'
        });
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            massage: 'Erro: não foi possivel escluir o cliente'
        });
    });
   
});




let port = process.env.PORT || 3001;

app.listen(port,(req,res)=>{
    console.log('Servidor ativo: http://localhost:3001');
});