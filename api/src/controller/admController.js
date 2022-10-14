import { loginAdm, cadastroAdm } from "../repository/admRepository.js";

import { Router } from "express";

const server = Router();

server.post('/login/adm', async (req, resp) => {
    try {
        const { email, senha } = req.body;
        const resposta = await loginAdm(email, senha);

        if(!resposta)
            throw new Error('Credenciais inválidas!')

        resp.send(resposta);
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})


server.post('/cadastro/admin', async (req, resp) => {
    try {
        const admin = req.body;
        
        if(!admin.email) {
            throw new Error('Insira um email!')
        }
        if(!admin.senha) {
            throw new Error('Insira uma senha!')
        }
        if(!admin.nome) {
            throw new Error('Insira um nome!')
        }
        if(!admin.cpf) {
            throw new Error('Insira um cpf!')
        }
        if(!admin.nascimento) {
            throw new Error('Insira sua data de Nascimento!')
        }
        if(new Date(admin.nascimento) >= new Date()) {
            throw new Error('Insira uma data de Nascimento Válida!')
        }
        if(!admin.telefone) {
            throw new Error('Insira um telefone!')
        }
        
        const resposta = await cadastroAdm(admin);
        resp.send(resposta);

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})

export default server;