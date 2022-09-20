import { con } from './connection.js';


export async function fazerSolicitacao(solicitacao) {
    const comando = `insert into tb_solicitacao (id_usuario, id_psicologo, ds_solicitacao, ds_situacao, dt_situacao)
    values (?, ?, ?, false, now())`

    const [resp] = await con.query(comando, [solicitacao.idUsuario, solicitacao.idVoluntario, solicitacao.assunto, solicitacao.data ])
    solicitacao.idSolicitacao = resp.insertId
    return solicitacao;
}

export async function mostrarSolicitacao(){
    const comando = `select 
           id_solicitacao solicitacao,
           id_usuario 	  usuario,
           id_psicologo   psicologo,
           ds_solicitacao texto,
           dt_situacao 	  horario
          
    from tb_solicitacao
    where id_usuario = ?`

    const [linhas] = await con.query(comando)
    return linhas;
}