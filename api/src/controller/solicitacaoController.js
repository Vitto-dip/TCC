import { Router } from "express";   

import { aceitarSolicitacao, alterarSolicitacao, carregarSolicitacaoUsuario, deletarSolicitacao, inserirSolicitacao, listarSoliciPsicologo, listarSolicitacao, mostrarTodasSolicitacoes, deletarSolicitacaoPsic, inserirCategoria, consultarCategorias, mostrarCatSol } from '../repository/solicitacaoRepository.js';
import { carregarUsuario } from "../repository/usuarioRepository.js";


const server = Router();


// Nova Solicitação
server.post('/solicitacao', async (req, resp) => {

    try {
        const novaSolicitacao = req.body;

        if (!novaSolicitacao){
            throw new Error("Não foi possível inserir Solicitação.")
        }
        if (!novaSolicitacao.assunto.trim()){
            throw new Error("Não foi possível inserir Solicitação.")
        }

        const resposta = await inserirSolicitacao(novaSolicitacao);
        resp.send(resposta);

    } catch (err) {
        resp.status(401).send({
            erro: err.message
        });
    }
})

// Mostrar Solicitação
server.get('/solicitacao/:id', async (req, resp) => {

    try {
        const mostrarTudo = Number(req.params.id);

        const resposta = await listarSolicitacao(mostrarTudo);
            
        resp.send(resposta);
        
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        });
    }
})


server.get('/solicitacao/psicologo/:id', async (req, resp) => {
    try {
        const solicitacao = Number(req.params.id);

        const resposta = await listarSoliciPsicologo(solicitacao);
        
        resp.send(resposta);

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})

server.put('/solicitacao/:id' , async (req, resp) => {
    try {
        const solicitacaoId = Number(req.params.id);
        const solicitacao = req.body;
        
        if (!solicitacao){
            throw new Error("Não foi possível alterar Solicitação.")
        }
        if (!solicitacao.assunto.trim()){
            throw new Error("Não foi possível alterar Solicitação.")
        }
        
        const resposta = await alterarSolicitacao(solicitacao, solicitacaoId);
        if (resposta != 1) {
            throw new Error("Não foi possível alterar Solicitação.")
        }
        resp.status(202).send()
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})


server.put('/solicitacao', async (req, resp) => {
    try {
        const ids = req.body;
        
        const resposta = await aceitarSolicitacao(ids);

        if(!resposta) {
            throw new Error('Não foi possivel aceitar essa Solicitação!')
        }
        
        resp.status(202).send();

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})


server.delete('/solicitacao/:id', async (req, resp) => {
    try {
        const id = Number(req.params.id);
        
        const resposta = await deletarSolicitacao(id);
        
        if (resposta != 1) {
            throw new Error("Solicitação não pode ser removida")
        }
        
        resp.status(204).send();
        
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})

server.get('/solicitacao', async (req, resp) => {
    try {
        
        const resposta = await mostrarTodasSolicitacoes() 
        resp.send(resposta)

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})


server.put('/solicitacao/psic/:id', async (req, resp) => {
    try{
        const id = Number(req.params.id)
        const resposta = await deletarSolicitacaoPsic(id);

        resp.status(202).send()
    }
    catch(err){
        
    }
})

server.get('/usuario/solicitacao/busca', async (req, resp) => {
    try {
        
        const { usuario, solicitacao } = req.query;
        const resposta = await carregarSolicitacaoUsuario(usuario, solicitacao)
        
        resp.send(resposta);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})

server.post('/usuario/sol/cat', async (req, resp) => {
    try {
        
        
        const {categoria, solicitacao} = req.query;

        const resposta = await inserirCategoria(categoria, solicitacao);
        resp.status(204).send()
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }

})


server.get('/usuario/solcad/cat/', async (req, resp) => {
    try {
        const {solicitacao} = req.query
        const resposta = await mostrarCatSol(solicitacao)
        resp.send(resposta)
    } catch (err) {
        resp.status(404).send({
            erro:err.message
        })
    }
})

export default server;