import { useEffect, useState } from "react";
import Storage from 'local-storage';
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom'
import { mudarSenhaUser } from '../../api/usuarioApi';
import './index.scss';

export default function EsqueciSenha() {
    const [email, setEmail] = useState('');




    return (
        <main className='ESenha'>
            <ToastContainer />
            <div>
                <div className='header'>
                    <img src='/assets/images/logonat.png' />
                    <div>
                        <Link to='/'>Pagina Inicial</Link>
                        <Link to='/home/login'>Voltar</Link>
                    </div>
                </div>


                <img src='/assets/images/mocoAtendimento.png' className='img' />

                <div className='painel'>
                    <h1>Esqueci minha senha</h1>
                    <p>Para redefinir sua senha, informe o e-mail cadastrado em sua conta e lhe enviaremos um e-mail com mais informações </p>

                    <div className='infoEmail'>
                        <label>E-mail</label>
                        <input type='text' placeholder='email@email.com' value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <button>Enviar</button>
                </div>
                <img src='/assets/images/mocaFormas.png' className='img2' />

            </div>

        </main>
    )


}