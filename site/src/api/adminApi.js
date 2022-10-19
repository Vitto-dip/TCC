import axios from 'axios'
import { API_URL } from './config.js'

const api = axios.create({
    baseURL: API_URL
})

export async function cadastroAdmin(email, senha, nome, cpf, nascimento, telefone) {
    const resposta = await api.post('/cadastro/admin', {
        email: email,
        senha: senha,
        nome: nome,
        cpf: cpf,
        nascimento: nascimento,
        telefone: telefone
    })

    return resposta.data
}



export async function loginAdm(email, senha) {
    
    const r = await api.post('/login/adm', {
        email: email,
        senha: senha
    })
    return r.data;
    
}

export async function carregarAdmin(id) {
    const resposta = await api.get(`/admin/${id}`);
    return resposta.data;
}

export async function PsicologosParaAprovar(){
    const resposta = await api.get('/admin/voluntario');
    return resposta.data;

}

export async function aprovarPsicologo(idPsico) {
    const resposta = await api.put(`/solicitacao`, {
        idPsicologo: idPsico
    });
    return resposta.data;
}

export async function carregarDenunciasPsicologo(){
    const resposta = await api.get('/denuncia/psicologo');
    return resposta.data;

}