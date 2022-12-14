import { con } from './connection.js';
import mailer from 'nodemailer'



export async function loginUsuario(email, senha) {
    const comando = `select id_usuario	id,
                        nm_usuario		nome,
                        ds_email		email
                    from tb_usuario
                    where ds_email      = ?
                    and ds_senha        = ?`

    const [resposta] = await con.query(comando, [email, senha]);
    
    return resposta[0];
}

export async function cadastroUsuario (user) {
    const comando = `insert into tb_usuario (ds_email, ds_senha, nm_usuario, ds_cpf, dt_nascimento, nr_telefone)
                                        values(?, ?, ?, ?, ?, ?)`


    const [resposta] = await con.query(comando, [user.email.trim(), user.senha.trim(), user.nome.trim(), user.cpf.trim(), user.nascimento, user.telefone.trim()]);
    user.id = resposta.insertId;

    return user;
}


export async function carregarUsuario(id) {
    
    const comando = `
    select  nm_usuario 	         nome,
            ds_email             email,
            nr_telefone          telefone,
            ds_cpf               cpf,
            date_format(dt_nascimento, '%d/%m/%Y') as DataDeNascimento
    from tb_usuario
    where id_usuario = ?`

    const [linhas] = await con.query(comando, id);
    return linhas[0]
}




export async function alterarUsuario (user, id) {
    const comando = `update tb_usuario
                            set nm_usuario      =  ?,
                                ds_email        =  ?,
                                nr_telefone     =  ?
                            where id_usuario    =  ?`


    const [resposta] = await con.query(comando, [user.nome.trim(), user.email.trim(), user.telefone.trim(), id]);
    return resposta[0];
    
}




export async function deletarUsuario(id) {
    const comando = `delete from tb_usuario
                        where id_usuario = ?`

    const [resposta] = await con.query(comando, [id]);
    return resposta.affectedRows;
}

export async function mostrarUsuarios(){
    const comando =`select	nm_usuario	nome,
                            ds_email	email,
                            nr_telefone telefone,
                            ds_cpf		cpf,
                            date_format (dt_nascimento, '%d/%m/%Y %H:%i') as data

                    from tb_usuario`

         const [resposta] = await con.query(comando)
         return resposta;
}

export async function pegarIDuser(email){
    const comando = `select id_usuario
                       from tb_usuario
                      where ds_email = ?`

    
    const [resposta] = await con.query(comando, [email]);
    return resposta[0];
}



export async function mudarSenhaUser(senha, id){
    const comando = `update tb_usuario
                        set ds_senha = ?
                      where id_usuario = ?`
    const [resposta] = await con.query(comando, [senha, id]);
    return resposta.affectedRows;
}


export async function buscarUserNome(nome){
    const comando = `select nm_usuario     nome,
                            ds_email       email,
                            nr_telefone    telefone,
                            ds_cpf         cpf,
                            dt_nascimento  DataDeNascimento
                     from tb_usuario
                     where nm_usuario like ?`
    const [resposta] = await con.query(comando, [ `%${nome}%`]);
    return resposta
}




