

import './index.scss'
import { useNavigate } from "react-router-dom";
import Storage from 'local-storage'
import { useState } from 'react';

export default function Menu(props) {

    const [menuSelecionado, setMenuSelecionado] = useState('home')

    function selecionarMenu(menu) {
        setMenuSelecionado(menu);
      }
    
    
   
    const navigate = useNavigate();

    

    function sairClickAdm () {
        Storage.remove('admin-logado');
        navigate('/login/adm')
    } 


    function irListarUser(){
        navigate('/admin/usuario')
    }



    function verificarMenuSelecionado(menu) {
        if (menu === props.selecionado)
            return 'selecionado'
        else
            return '';
    }

    

    return (
        <nav className="comp-menu">
            <div className='comp-menu1'>
                <div className='logo'>
                    <img src="/assets/images/imagem_2022-07-30_124517537-removebg-preview 2.png" alt="logo" />
                </div>

                <div className='menu-items'>
                    <div className={verificarMenuSelecionado('home')} onClick={() => [navigate('/admin')]}>
                        <img src="/assets/images/Home (1).png" alt="home" />
                        <div  className='item'>Home</div>
                    </div>
                    <div className={verificarMenuSelecionado('a ser aprovado')} onClick={() => [navigate('/admin/cadastros')]}>
                        <img src="/assets/images/icons8-selecionado-128 2.png" alt="A ser aprovado" />
                        <div>A ser aprovado</div>
                    </div>
                    <div className={verificarMenuSelecionado('denúncia Psicólogos')} onClick={() => [navigate('/admin/denuncias/psicologo')]}>
                        <img src="/assets/images/Spam.png" alt="Denúncia Psicólogos" />
                        <div>Denúncia Psicólogos</div>
                    </div>
                    <div className={verificarMenuSelecionado('Denúncia pacientes')} onClick={() => [navigate('/admin/denuncias/usuario')]}>
                        <img src="/assets/images/Spam.png" alt="Denúncia Pacientes" />
                        <div>Denúncia Pacientes</div>
                    </div>
                    <div className={verificarMenuSelecionado('Psicólogos cadastrados')} onClick={() => [navigate('/admin/volunts')]}>
                        <img src="/assets/images/do-utilizador (1) 3.png" alt="Psicólogos cadastrados" />
                        <div>Psicólogos cadastrados</div>
                    </div>
                    <div className={verificarMenuSelecionado('Pacientes cadastrados')}>
                        <img src="/assets/images/do-utilizador (1) 3.png" alt="Pacientes cadastrados" />
                        <div onClick={irListarUser}>Pacientes cadastrados</div>
                    </div>
                    <div onClick={sairClickAdm} className='menu-sair'>
                        <img className="img-sair" src="/assets/images/Logout.png" alt="Sair" />
                        <span>Sair</span>
                    </div>
                </div>
            </div>
        </nav>
    )
}