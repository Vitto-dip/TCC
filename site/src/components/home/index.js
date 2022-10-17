

import './index.scss'
import { useNavigate } from "react-router-dom";
import Storage from 'local-storage'

export default function Menu(props) {

    
   
    const navigate = useNavigate();

    

    function sairClickAdm () {
        Storage.remove('admin-logado');
        navigate('/login/adm')
    } 

    function irHome(){
        navigate('/admin')
    }

    function irAprovar(){
        navigate('/admin/cadastros')
    }


    function verificarMenuSelecionado(menu) {
        if (menu === props.selecionado)
            return 'selecionado'
        else
            return '';
    }

    

    return (
        <nav className="comp-menu">
            <div>
                <div className='logo'>
                    <img src="/assets/images/imagem_2022-07-30_124517537-removebg-preview 2.png" alt="logo" />
                </div>

                <div className='menu-items'>
                    <div className={verificarMenuSelecionado('home')}>
                        <img src="/assets/images/Home (1).png" alt="home" />
                        <div onClick={irHome} className='item'>Home</div>
                    </div>
                    <div className={verificarMenuSelecionado('a ser aprovado')}>
                        <img src="/assets/images/icons8-selecionado-128 2.png" alt="A ser aprovado" />
                        <div onClick={irAprovar}>A ser aprovado</div>
                    </div>
                    <div className={verificarMenuSelecionado('denúncia Psicólogos')}>
                        <img src="/assets/images/Spam.png" alt="Denúncia Psicólogos" />
                        <div>Denúncia Psicólogos</div>
                    </div>
                    <div className={verificarMenuSelecionado('Denúncia pacientes')}>
                        <img src="/assets/images/Spam.png" alt="Denúncia Pacientes" />
                        <div>Denúncia Pacientes</div>
                    </div>
                    <div className={verificarMenuSelecionado('Psicólogos cadastrados')}>
                        <img src="/assets/images/do-utilizador (1) 3.png" alt="Psicólogos cadastrados" />
                        <div>Psicólogos cadastrados</div>
                    </div>
                    <div className={verificarMenuSelecionado('Pacientes cadastrados')}>
                        <img src="/assets/images/do-utilizador (1) 3.png" alt="Pacientes cadastrados" />
                        <div>Pacientes cadastrados</div>
                    </div>
                    <div className='menu-sair'>
                        <img className="img-sair" src="/assets/images/Logout.png" alt="Sair" />
                        <span onClick={sairClickAdm}>Sair</span>
                    </div>
                </div>
            </div>
        </nav>
    )
}