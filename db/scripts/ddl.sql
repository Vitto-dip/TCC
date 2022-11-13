CREATE DATABASE if not exists NEEDATALK_DB;
USE NEEDATALK_DB;

CREATE TABLE TB_ADM(
ID_ADM			INT PRIMARY KEY AUTO_INCREMENT,
DS_EMAIL		VARCHAR(100),
DS_SENHA		VARCHAR(20),
NM_ADM			VARCHAR(50),
DS_CPF			VARCHAR(15),
DT_NASCIMENTO	DATE,
NR_TELEFONE		VARCHAR(20)
);

CREATE TABLE TB_PSICOLOGO(
ID_PSICOLOGO 		INT PRIMARY KEY AUTO_INCREMENT,
DS_EMAIL 			VARCHAR(100),
DS_SENHA 			VARCHAR(20),
NM_PSICOLOGO 		VARCHAR(50),
DS_CPF 				VARCHAR(15),
DT_NASCIMENTO 		DATE,
NR_TELEFONE 		VARCHAR(15),
DS_CRP 				VARCHAR(10),
DS_VAGAS 			INT,
DS_SITUACAO         BOOLEAN,
IMG_PSICOLOGO       VARCHAR(400)
);

CREATE TABLE TB_USUARIO(
ID_USUARIO 	  INT PRIMARY KEY AUTO_INCREMENT,
DS_EMAIL 	  VARCHAR(100),
DS_SENHA 	  VARCHAR(20),
NM_USUARIO 	  VARCHAR(50),
DS_CPF 		  VARCHAR(15),
DT_NASCIMENTO DATE,
NR_TELEFONE   VARCHAR(15)
);

CREATE TABLE TB_DENUNCIA_PSICOLOGO(
ID_DENUNCIA 	INT PRIMARY KEY AUTO_INCREMENT,
ID_PSICOLOGO 	INT,
ID_USUARIO 		INT,
DS_DENUNCIA 	VARCHAR(100),

FOREIGN KEY (ID_PSICOLOGO) REFERENCES TB_PSICOLOGO(ID_PSICOLOGO) ON DELETE CASCADE,
FOREIGN KEY (ID_USUARIO) REFERENCES TB_USUARIO(ID_USUARIO)
);


CREATE TABLE TB_SOLICITACAO(
ID_SOLICITACAO 	INT PRIMARY KEY AUTO_INCREMENT,
ID_USUARIO 		INT,
ID_PSICOLOGO 	INT,
DS_SOLICITACAO 	VARCHAR(5000),
DS_SITUACAO	  	BOOLEAN,
DT_SITUACAO 	DATETIME,

FOREIGN KEY (ID_USUARIO) REFERENCES TB_USUARIO(ID_USUARIO),
FOREIGN KEY (ID_PSICOLOGO) REFERENCES TB_PSICOLOGO(ID_PSICOLOGO)
ON DELETE CASCADE
);

CREATE TABLE TB_CATEGORIA(
ID_CATEGORIA 	INT PRIMARY KEY AUTO_INCREMENT,
NM_CATEGORIA 	VARCHAR(20)
);

CREATE TABLE TB_SOLICITACAO_CATEGORIA(
ID_SOLICITACAO_CATEGORIA INT PRIMARY KEY AUTO_INCREMENT,
ID_SOLICITACAO 			 INT,
ID_CATEGORIA			 INT,

FOREIGN KEY (ID_SOLICITACAO) REFERENCES TB_SOLICITACAO (ID_SOLICITACAO),
FOREIGN KEY (ID_CATEGORIA) REFERENCES TB_CATEGORIA (ID_CATEGORIA)
);

CREATE TABLE TB_CONSULTA(
ID_CONSULTA		INT PRIMARY KEY AUTO_INCREMENT,
ID_USUARIO		INT,
ID_PSICOLOGO 	INT,
DT_CONSULTA 	DATETIME,
DS_LINK_MEET	VARCHAR(200),

FOREIGN KEY (ID_USUARIO) REFERENCES TB_USUARIO(ID_USUARIO),
FOREIGN KEY (ID_PSICOLOGO) REFERENCES TB_PSICOLOGO(ID_PSICOLOGO)
ON DELETE CASCADE
);

CREATE TABLE TB_PRONTUARIO(
ID_PRONTUARIO 	INT PRIMARY KEY AUTO_INCREMENT,
ID_USUARIO		INT,
ID_PSICOLOGO    INT,
DS_DIAGNOSTICO	VARCHAR(2000),
DS_REACOES		VARCHAR(2000),
DS_ESTADO		VARCHAR(2000),
DS_HISTORIA		VARCHAR(2000),
DS_EXAME		VARCHAR(2000),
DS_GERAL		VARCHAR(2000),
DT_PRONTUARIO	DATETIME,

FOREIGN KEY (ID_USUARIO) REFERENCES TB_USUARIO(ID_USUARIO),
FOREIGN KEY (ID_PSICOLOGO) REFERENCES TB_PSICOLOGO(ID_PSICOLOGO)
);

CREATE TABLE TB_CHAT(
ID_CHAT 	 INT PRIMARY KEY AUTO_INCREMENT,
ID_USUARIO 	 INT,
ID_PSICOLOGO INT,

FOREIGN KEY (ID_USUARIO) REFERENCES TB_USUARIO(ID_USUARIO),
FOREIGN KEY (ID_PSICOLOGO) REFERENCES TB_PSICOLOGO(ID_PSICOLOGO)
ON DELETE CASCADE
);

CREATE TABLE TB_MENSAGEM(
ID_MENSAGEM 	INT PRIMARY KEY AUTO_INCREMENT,
TP_REMETENTE	VARCHAR(10),
ID_CHAT			INT,
DS_MENSAGEM		VARCHAR(200)

FOREIGN KEY (ID_CHAT) REFERENCES TB_CHAT (ID_CHAT)
);


CREATE TABLE TB_DENUNCIA_USUARIO(
ID_DENUNCIA 	INT PRIMARY KEY AUTO_INCREMENT,
ID_USUARIO 		INT,
ID_PSICOLOGO	INT,
DS_DENUNCIA		VARCHAR(100),
ID_SOLICITACAO	INT,

FOREIGN KEY (ID_USUARIO) REFERENCES TB_USUARIO(ID_USUARIO),
FOREIGN KEY (ID_PSICOLOGO) REFERENCES TB_PSICOLOGO(ID_PSICOLOGO) ON DELETE CASCADE,
FOREIGN KEY (ID_SOLICITACAO) REFERENCES TB_SOLICITACAO(ID_SOLICITACAO)
);






