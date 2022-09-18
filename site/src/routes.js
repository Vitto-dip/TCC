import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Lading from './pages/lading-page/index.js';
import CadastroVoluntario from './pages/cadastro/cadastroVoluntario/index.js';

import PerfilUsuario from './pages/perfil-usuario/index.js';
import CadastroPaciente from './pages/cadastro/cadastroPaciente/index.js'




export default function Rotas() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Lading /> } />
                <Route path='/cadastro/voluntario' element={ <CadastroVoluntario /> } />

                <Route path='/perfil/usuario' element={ <PerfilUsuario/>} />
                <Route path='/cadastro/paciente' element={ <CadastroPaciente /> } />


            </Routes>
        </BrowserRouter>
    )
}