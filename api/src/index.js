import 'dotenv/config'

import { serverHttp, server } from './WebSockt/scoket.js';
import './WebSockt/server.js';

import usuarioController from './controller/usuarioController.js';
import voluntarioController from './controller/voluntarioController.js'
import admController from './controller/admController.js'
import solicitacaoController from './controller/solicitacaoController.js'
import denunciaController from './controller/denunciaController.js'
import mensagemController from './controller/mensagemController.js'
import prontuarioController from './controller/prontuarioController.js'
import categoriaController from './controller/categoriaController.js'
import senhaController from './controller/senhaController.js'
import consultaController from './controller/consultaController.js'
import chatController from './controller/chatController.js'


import express from 'express';
import cors from 'cors';


// liberar arquivos da storage
server.use('/storage/fotosVoluntarios', express.static('storage/fotosVoluntarios'));

// configs dos endpoints
server.use(usuarioController);
server.use(voluntarioController);
server.use(admController);
server.use(solicitacaoController);
server.use(denunciaController);
server.use(mensagemController);
server.use(prontuarioController);
server.use(categoriaController);
server.use(senhaController);
server.use(consultaController);
server.use(chatController);




serverHttp.listen(process.env.PORT,
             () => console.log(`API online na porta ${process.env.PORT}`));