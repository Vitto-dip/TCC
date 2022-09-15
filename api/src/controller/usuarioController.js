import { loginUsuario } from '../repository/usuarioRepository.js'

import { Router } from "express";


const server = Router();

server.post('/login/usuario', async (req, resp) => {
    try {
        const { email, senha } = req.body;

        const resposta = await loginUsuario(email, senha);

        if(!email || !senha)
            throw new Error('Credenciais inválidas!')

        resp.send(resposta);
        
    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})

export default server;
