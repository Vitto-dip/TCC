
import { loginVoluntario, cadastroVoluntario, carregarVoluntario, alterarVoluntario, alterarImagem, mostrarPsicologos, mudarSenhaVolunt, buscarVoluntNome, PegarIDPsic } from "../repository/voluntarioRepository.js";

import multer from 'multer'
import { Router } from "express";

const server = Router();
const upload = multer({ dest: 'storage/fotosVoluntarios' })

server.post('/login/voluntario', async (req, resp) => {
    try {
        const { email, senha } = req.body;
    
        const resposta = await loginVoluntario(email, senha);
    
        if(!resposta)
            throw new Error('Credenciais inválidas!')

        if(resposta.situacao === null)
            throw new Error('Cadastro em análise!')

        resp.send(resposta);
        
    } catch (err) {
        resp.status(401).send({
            erro: err.message
        })
    }
})


server.post('/cadastro/voluntario', async (req, resp) => {
    try {
        const volunt = req.body;

        const emailCheck = await PegarIDPsic(volunt.email); 

        const data = new Date() - new Date(volunt.nascimento); 
        
        if(volunt.nome.length < 5){
            throw new Error('Insira um nome válido!')
        }
        if(!volunt.email) {
            throw new Error('Insira um email!')
        }
        if(emailCheck){
            throw new Error('Este e-mail já existe!')
        }
        if(!volunt.senha) {
            throw new Error('Insira uma senha!')
        }
        if(volunt.senha.length < 5) {
            throw new Error('A senha deve ter ao menos 5 caracteres!')
        }
        if(!volunt.nome.trim()) {
            throw new Error('Insira um nome!')
        }
        if(!volunt.cpf.trim()) {
            throw new Error('Insira um cpf!')
        }
        if(!volunt.nascimento) {
            throw new Error('Insira uma data de Nascimento!')
        }
        if(new Date(volunt.nascimento) >= new Date()) {
            throw new Error('Insira uma data de nascimento válida!')
        }
        if(data < 563761963363){
            throw new Error('Você deve ter ao menos 18 anos.')
        }
        if(!volunt.telefone) {
            throw new Error('Insira um telefone!')
        }
        if(volunt.telefone.length < 11 || volunt.telefone.length > 11) {
            throw new Error('Insira um telefone válido!')
        }
        if(!volunt.vagas) {
            throw new Error('Insira a quantidade de vagas que você poderá atender!')
        }
        if(!volunt.crp) {
            throw new Error('Insira seu crp!')
        }

        const resposta = await cadastroVoluntario(volunt);
        resp.send(resposta);

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})


server.get('/voluntario/:id', async (req, resp) => {
    try {
        const voluntario = Number(req.params.id);

        const resposta = await carregarVoluntario(voluntario);
        resp.send(resposta);
    }
    catch(err) {
        resp.status(404).send({
            erro: err.message
        })
    }})


    
server.put('/alterar/voluntario/:id', async (req, resp) => {
    try {
        const voluntarioId = req.params.id;
        const volunt = req.body;

        const voluntario = await carregarVoluntario(voluntarioId);

        
        if(volunt.nome === voluntario.nome && volunt.email == voluntario.email && volunt.telefone === voluntario.telefone){
            throw new Error('Não houve alterações!')
        }
        if(!volunt.email.trim()) {
            throw new Error('Insira um email!')
        }
        if(!volunt.nome.trim()) {
            throw new Error('Insira um nome!')
        }
        if(!volunt.telefone) {
            throw new Error('Insira um telefone!')
        }

        
        const r = await alterarVoluntario(volunt, voluntarioId);
        resp.send(r);

    } catch (err) {

        resp.status(404).send({
            erro: err.message
        })
    }
})

server.put('/voluntario/:id/foto', upload.single('Foto') ,async (req, resp) => {
    try {
        const { id } = req.params;
        const imagem = req.file.path;

        const resposta = await alterarImagem(imagem,id);
        if(resposta != 1 )
            throw new Error('A imagem não pode ser inserida')

        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/listar/voluntario', async (req, resp) => {
    try {
        const resposta = await mostrarPsicologos()
        resp.send(resposta)

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
})

server.put('/senha/voluntario/:id', async (req, resp) =>{

    try {
        const voluntID = Number(req.params.id);
        const volunt = req.body;
        
        const voluntario = await carregarVoluntario(voluntID);

        if(volunt.senha === voluntario.senha){
            throw new Error('Insira uma senha diferente da anterior')
        }

        const r = await mudarSenhaVolunt(volunt, voluntID)
        resp.status(204).send()

    } catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }


})

server.get('/volunt/busca', async (req, resp) => {
    try {
        const { nome } = req.query;

        const resposta = await buscarVoluntNome(nome)

        if(!resposta)
            resp.status(404).send([])
        else
            resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

export default server;