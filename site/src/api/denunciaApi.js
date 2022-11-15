import axios from "axios";
import { API_URL } from './config.js';

const api = axios.create({
    baseURL: API_URL
})


export async function denunciarUsuario(idUsuario, idPsicologo, idSolicitacao) {
    const resposta = await api.post(`/denuncia/usuario`, {
        idUsuario: idUsuario,
        idPsicologo: idPsicologo,
        idSolicitacao: idSolicitacao
    })
    return resposta.data
}



export async function denunciarPsicologo(denunciarPsi) {
    const resposta = await api.post(`/denuncia/psicologo`, {
        depoimento: denunciarPsi
    })
    return resposta.data
}

export async function denunciarUsuarioChat(denunciarUserChat) {
    const resposta = await api.post(`/chatdenuncia/usuario`, {
        depoimento: denunciarUserChat
    })
    return resposta.data
}

export async function denunciaPerfil(paciente, psicologo, emailPaci, emailPsi, depoimento, idUser) {
    const resposta = await api.post(`/denunciaperfil/`, {
        nomeUsuario: paciente,
        nomePsicologo: psicologo,
        emailUsuario: emailPaci,
        emailPsicologo: emailPsi,
        depoimento: depoimento,
        idUsuario: idUser
    })
    return resposta.data;
}