import axios from 'axios'
import { API_URL } from './config';

const api = axios.create({
    baseURL: API_URL
})


export async function cadastroVoluntario(email, senha, nome, cpf, nascimento, telefone, vagas, crp) {
    const resposta = await api.post('/cadastro/voluntario', {
        email: email,
        senha: senha,
        nome: nome,
        cpf: cpf,
        nascimento: nascimento,
        telefone: telefone,
        vagas: vagas,
        crp: crp 
    })

    return resposta.data;
}

export async function loginVoluntario(email, senha) {
    const resposta = await api.post('/login/voluntario', {
        email: email,
        senha: senha
    })

    return resposta.data;
}

export async function carregarVoluntario(id) {
    const resposta = await api.get(`/voluntario/${id}`);
    return resposta.data;
}

export async function alterarVoluntario(id, nome, email, telefone) {
    const resposta = await api.put(`/alterar/voluntario/${id}`, {
        nome: nome,
        email: email,
        telefone: telefone
    })

    return resposta.data;
}


export async function deletarVoluntario(id){
    const resposta = await api.delete(`/voluntario/${id}`);

    return resposta.data;
}

export async function colocarImagemVolunt(id, imagem){
    const formData = new FormData();
    formData.append('Foto', imagem);

    const resposta = await api.put(`/voluntario/${id}/foto`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return resposta.status;

}
export function buscarImagem(imagem){
    return `${api.getUri()}/${imagem}`
}

export async function mostrarPsicologos(){
    const resposta = await api.get('/listar/voluntario');
    return resposta.data
}

export async function buscarNomeVolunt(nome){
    const resposta = await api.get(`/volunt/busca?nome=${nome}`);
    return resposta.data
}