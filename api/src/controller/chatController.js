import {  Router } from 'express'
import { carregarChatsPsicologo, carregarChatsUsuario, criarChat, enviarMensagem, mostrarMensagem, checarChat, carregarNomeUsuario, carregarNomePsic } from '../repository/chatRepository.js';


const server = Router();

server.post('/chat', async (req, resp) => {
    try {
        const { usuario, psicologo } = req.query;

        const resposta = await criarChat(usuario, psicologo);

        resp.send(resposta)
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
}) 

server.get('/chat/disponivel', async (req, resp) => {
    try{
        const { usuario, psicologo } = req.query;
        const resposta = await checarChat(usuario, psicologo);
        resp.send(resposta)
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/usuario/mensagem/:id', async (req, resp) => {
    try {
        const id = Number(req.params.id);

        const resposta = await carregarChatsUsuario(id);

        resp.send(resposta)
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

server.get('/psicologo/mensagem/:id', async (req, resp) => {
    try {
        const idPsic = Number(req.params.id)
    
        const resposta = await carregarChatsPsicologo(idPsic);

        resp.send(resposta)
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})


server.post('/chat/mensagem', async (req, resp) => {
    try {
        const { remetente, id, mensagem } = req.body;

        const resposta = await enviarMensagem(remetente, id, mensagem); 
        

        resp.send(resposta)
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

server.get('/conversa/mensagem/:id', async (req, resp) => {
    try {
        const idChat = req.params.id;
        const resposta = await mostrarMensagem(idChat)

        resp.send(resposta)
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

server.get('/chat/nome/usuario/:id', async (req, resp) => {
    try{
        const idChat = req.params.id;
        const resposta = await carregarNomeUsuario(idChat)
        resp.send(resposta)
    }
    catch(err){
        resp.send({
            erro: err.message
        })
    }
})

server.get('/chat/nome/psicologo/:id', async (req, resp) => {
    try{
        const idChat = req.params.id;
        const resposta = await carregarNomePsic(idChat)
        resp.send(resposta)
    }
    catch(err){
        resp.send({
            erro: err.message
        })
    }
})

export default server;