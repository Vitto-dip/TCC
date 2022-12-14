import { con } from "./connection.js";

export async function enviarProntuario(idUsuario, idPsicologo) {
    const comando = `insert into
                        tb_prontuario (
                        ID_USUARIO,
                        ID_PSICOLOGO,
                        DS_DIAGNOSTICO,
                        DS_REACOES,
                        DS_ESTADO,
                        DS_HISTORIA,
                        DS_EXAME,
                        DS_GERAL,
                        DT_PRONTUARIO
                        )
                    values
                        (?, ?, null, null, null, null, null, null, now())`

    const [resposta] = await con.query(comando, [idUsuario, idPsicologo]);
    return resposta[0]
}

export async function novoProntuario(prontuario, idUsuario, idPsicologo) {
    const comando = `update
                        tb_prontuario
                    set
                        DS_DIAGNOSTICO      = ?,
                        DS_REACOES          = ?,
                        DS_ESTADO           = ?,
                        DS_HISTORIA         = ?,
                        DS_EXAME            = ?,
                        DS_GERAL            = ?,
                        DT_PRONTUARIO       = now()
                    where
                        ID_USUARIO = ?
                    and ID_PSICOLOGO = ?`

    const [resposta] = await con.query(comando, [prontuario.diagnostico, prontuario.reacoes, prontuario.estado, prontuario.historia, prontuario.exame, prontuario.geral, idUsuario, idPsicologo]);
    return resposta.affectedRows;
}


export async function consultarProntuario() {
    const comando = `select
                        id_prontuario id,
                        nm_usuario usuario,
                        nm_psicologo psicologo,
                        ds_diagnostico diagnostico,
                        ds_reacoes reacoes,
                        ds_estado estado,
                        ds_historia historia,
                        ds_exame exame,
                        ds_geral geral,
                        dt_prontuario dataProntuario,
                        date_format(dt_prontuario, '%d/%m/%Y') as dataProntuario
                    from
                        tb_prontuario
                        inner join tb_usuario on tb_prontuario.id_usuario = tb_usuario.id_usuario
                        inner join tb_psicologo on tb_prontuario.id_psicologo = tb_psicologo.id_psicologo`

    const [resposta] = await con.query(comando)
    return resposta
}

export async function consultarProntuarioUsuario(usuario) {
    const comando = `select
                        id_prontuario id,
                        tb_usuario.nm_usuario usuario,
                        tb_psicologo.nm_psicologo psicologo,
                        tb_prontuario.ds_diagnostico diagnostico,
                        tb_prontuario.ds_reacoes reacoes,
                        tb_prontuario.ds_estado estado,
                        tb_prontuario.ds_historia historia,
                        tb_prontuario.ds_exame exame,
                        tb_prontuario.ds_geral geral,
                        tb_prontuario.dt_prontuario dataProntuario,
                        date_format(tb_prontuario.dt_prontuario, '%d/%m/%Y') as dataProntuario
                    from
                        tb_prontuario
                        inner join tb_usuario on tb_prontuario.id_usuario = tb_usuario.id_usuario
                        inner join tb_psicologo on tb_prontuario.id_psicologo = tb_psicologo.id_psicologo
                        where tb_usuario.id_usuario = ?`

    const [resposta] = await con.query(comando, [usuario])
    return resposta[0]
}