use NEEDATALK_DB;

-- CADASTRO ADM
insert into tb_adm (ds_email, ds_senha, nm_adm, ds_cpf, dt_nascimento, nr_telefone)
	   values('depaula@email', '1234', 'De Paula','123.456.789-01', '2004-09-23', '(11)912345678');
       
-- LOGIN ADM
select * 
  from tb_adm
where ds_email = 'email.adm123@gmail.com'
  AND ds_senha = '1234';


-- CADASTRO PSICOLOGO
insert into tb_psicologo (ds_email, ds_senha, nm_psicologo, ds_cpf, dt_nascimento, nr_telefone, ds_vagas, ds_situacao, ds_crp)
	   values('email@psi', '1234', 'Jene4','123.456.789-02', '1996-07-19', '(11)912345678', null, null, 'xx/321/123');

-- COLOCAR IMAGEM PSICOLOGO
update tb_psicologo
   set img_psicologo = 'imagem'
 where id_psicologo = 1;

-- LOGIN PSICOLOGO
select * 
  from tb_psicologo
where ds_email = 'email.psi1234@gmail.com'
  AND ds_senha = '1234';
  
-- CADASTRO USUARIO  
insert into tb_usuario (ds_email, ds_senha, nm_usuario, ds_cpf, dt_nascimento, nr_telefone)
	   values('usuario.com', '1234', 'JujuPistori','123.456.789-01', '2004-09-23', '(11)912345678');

-- LOGIN USUARIO
select * 
  from tb_usuario
where ds_email = 'email.user1234@gmail.com'
  AND ds_senha = '1234';
  
-- INFO PERFIL ADM

select nm_adm 	 nome,
	   ds_email      email,
       ds_senha,
       nr_telefone   telefone,
       ds_cpf        cpf,
       date_format(dt_nascimento, '%d/%m/%Y') as DataDeNascimento
  from tb_adm
where id_adm = 1;  

-- BUSCAR USUARIO
select nm_usuario,
       ds_email,
       nr_telefone,
       ds_cpf,
       dt_nascimento
  from tb_usuario
 where nm_usuario like '%B%';
  
  
-- INFO PERFIL USUARIO
select nm_usuario 	 nome,
	   ds_email      email,
       nr_telefone   telefone,
       ds_cpf        cpf,
       date_format(dt_nascimento, '%d/%m/%Y') as DataDeNascimento
  from tb_usuario
where id_usuario = 1;

-- INFO PERFIL PSICOLOGO
select nm_psicologo 	nome,
	   ds_email 		email,
       nr_telefone 		telefone,
       ds_cpf 			cpf,
       ds_crp			crp,
       dt_nascimento	DataDeNascimento,
       ds_vagas 		vagas
  from tb_psicologo
 where id_psicologo = 1;


-- ACEITAR PSIC??LOGO

update tb_psicologo
   set ds_situacao = true
 where id_psicologo = 4;  

-- LISTAR PSIC??LOGOS A SEREM APROVADOS

select nm_psicologo 	nome,
	   ds_email 		email,
       nr_telefone 		telefone,
       dt_nascimento	DataDeNascimento,
       ds_cpf 			cpf,
       ds_crp			crp,
       ds_situacao      situa????o
 from tb_psicologo
where ds_situacao  is null
ORDER BY id_psicologo desc;
        
	   

-- EDITAR PERFIL USUARIO
update tb_usuario
   set nm_usuario  =  'Juliano Pistori',
	   ds_email    =  'email.user.juju@gmail.com',
       nr_telefone =  '(11)912332112'
 where id_usuario = 1;
 
  
-- ENVIAR SOLICITACAO  
insert into tb_solicitacao (id_usuario, ds_solicitacao, ds_situacao, dt_situacao)
                    values (1, 'site de broxakkkkk' , false, sysdate());
             
-- MOSTRAR SOLICITACAO             
select id_solicitacao solicitacao,
	   id_usuario 	  usuario,
	   id_psicologo   psicologo,
       ds_solicitacao texto,
       DATE_FORMAT(dt_situacao, '%d/%m/%Y %H:%i') as horario
from tb_solicitacao
where id_solicitacao = 1;

select id_solicitacao 	solicitacao,
	   nm_usuario 	  	usuario,
       nr_telefone      telefone,
       date_format(dt_nascimento, '%d/%m/%Y') as DataDeNascimento,
       id_psicologo   	psicologo,
       ds_solicitacao 	texto,
       ds_situacao		situacao,	
       date_format(dt_situacao, '%d/%m/%Y %H:%i') as horario
  from tb_solicitacao 
 inner join tb_usuario on tb_usuario.id_usuario = tb_solicitacao.id_usuario
 where id_psicologo  = 1
   and ds_situacao     = true;


-- aceitar solicita????o
update tb_solicitacao
   set id_psicologo = 4,
	   ds_situacao = true
 where id_solicitacao = 1;

-- EDITAR SOLICITACAO
update tb_solicitacao 
   set ds_solicitacao = ' Sabe tudo come??ou a pipipi popopo Estudei, trabalhei, me sacrifiquei, mas acabei no fracasso. A vida de fato n??o tem a obriga????o de ser justa e eu devo ser um azarado ou pode ser apenas o acaso. Nesse ponto da minha vida a unica certeza que tenho ?? que eu n??o sou minimamente feliz. Me sinto em uma pris??o interna e externa da qual n??o consigo escapar. Tenho entrado em contato com coachs, todos dizem que eu devo seguir o caminho do qual eu me sinta feliz, e que por consequ??ncia, isso vai me trazer felicidade, entretanto, n??o consigo ver nenhum caminho que me fa??a feliz apesar de todo o esfor??o.',
	   ds_situacao = null, dt_situacao = now()
 where id_solicitacao = 1;
 
-- DELETAR SOLICITACAO
delete from tb_solicitacao
	  where id_solicitacao = 1;



-- ACEITAR PSICOLOGO
update tb_psicologo
   set ds_situacao = true
 where id_psicologo = 1;

-- DENUNCIAR USU??RIO (SOLICITA????O)
insert tb_denuncia_usuario(id_usuario, id_psicologo, id_solicitacao)
 value(1, 1, 36);


-- LISTAR DENUNCIA USU??RIO - ADMINISTRADOR
select id_denuncia     denuncia,
	   nm_usuario      nome,
	   ds_email        email,
       ds_solicitacao  solicita????o
  from tb_denuncia_usuario

inner join tb_usuario on tb_usuario.id_usuario = tb_denuncia_usuario.id_usuario
inner join tb_solicitacao on tb_solicitacao.id_solicitacao = tb_denuncia_usuario.id_solicitacao;


-- ACEITAR DEN??NCIA - DELETAR USU??RIO

delete 
  from tb_usuario 
 where id_usuario = 1;

delete 
  from tb_denuncia_usuario
 where id_usuario = 1;

-- RECUSAR DEN??NCIA	  

delete 
  from tb_denuncia_usuario
 where id_denuncia = 1;
      
-- DENUNCIAR PSIC??LOGO 
insert tb_denuncia_psicologo(id_usuario, id_psicologo, ds_denuncia)
 value(1, 1, 'xingou minha fam??lia');

-- LISTAR DENUNCIA PSIC??LOGO - ADMINISTRADOR
select   id_denuncia               denuncia,
         tb_psicologo.nm_psicologo nomepsi,
		 tb_psicologo.ds_email     emailpsicologo,
		 tb_usuario.nm_usuario     nome,
	     tb_usuario.ds_email       email,
         ds_denuncia               depoimento
  from   tb_denuncia_psicologo
inner join tb_psicologo on tb_psicologo.id_psicologo = tb_denuncia_psicologo.id_psicologo
inner join tb_usuario on tb_usuario.id_usuario = tb_denuncia_psicologo.id_usuario;




-- denuncia de psic??logo para usu??rio

insert tb_denuncia_usuario(id_usuario, id_psicologo, ds_denuncia, id_solicitacao)
                                          value(1, 2, 'depoimento', 36);

-- ACEITAR DEN??NCIA - DELETAR PSIC??LOGO

delete 
  from tb_usuario 
 where id_usuario = 6;

select* from tb_usuario;
-- RECUSAR DEN??NCIA	- psic??logo  

delete 
  from tb_denuncia_usuario
 where id_denuncia = 1;

 -- INSERIR CONSULTA
insert into tb_consulta(ID_USUARIO, ID_PSICOLOGO, DT_CONSULTA, DS_LINK_MEET)
	 values(1, 1, '2022-11-05', 'meet.com/psicologoConsulta' );
     
-- SELECIONAR CONSULTA
     select id_consulta   CONSULTA,
			      id_usuario	  USUARIO,
            id_psicologo  PSICOLOGO,
            DATE_FORMAT(dt_consulta, '%d/%m/%Y %H:%i') as HORARIO,
            ds_link_meet  MEET
     from tb_consulta


--CRIAR CHAT PSICOLOGO USUARIO

insert into tb_chat(id_usuario, id_psicologo)
values(1, 1)



