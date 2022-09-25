import axios from 'axios'
import { API_URL } from './config.js';


const api = axios.create({
    baseURL: API_URL
})


export async function inserirSolicitacao(idUsuario, assunto) {
    console.log(idUsuario, assunto)
    const resp = api.post(`/solicitacao`, {
        idUsuario: idUsuario,
        assunto: assunto
    })
    return resp.data;
}

export async function carregarSolicitacao(id) {
    const resposta = api.get(`/mostrar/solicitacao/${id}`);
    return resposta.data;
}