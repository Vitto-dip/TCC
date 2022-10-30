import './index.scss' 

export default function DenunciarPsicologo() {
    return(
        <main className='denunciar-psicologo-main'>
            
            <div className='painel-linear'>
                <div className='header-painel'>
                    <img src='/assets/images/logonat.png'/>

                    <button>Perfil</button>
                </div>
                <div>
                <div>
                <h2>Denunciar Psicólogo</h2>
                <p>Sua denuncia será enviada e revisada por administradores.
                    Ela é muito importante para a manutenção da segurança de nosso site!
                </p>
                </div>
                </div>  
                
                <img className='manutencao-img' src='/assets/images/manutencao.png'/>
            </div>  
            <div>
                <div>
                    <label>
                        Psicólogo
                        <input placeholder='Nome e sobrenome' />
                    </label>
                    <label>
                        E-mail Psicólogo
                        <input placeholder='example@example.com' />
                    </label>
                </div>
                <div>
                <label>
                        Paciente
                        <input placeholder='Nome e sobrenome' />
                    </label>
                    <label>
                        E-mail Paciente
                        <input placeholder='example@example.com' />
                    </label>
                </div>
                <div>
                    <textarea></textarea>
                    <button>Enviar</button>
                </div>
            </div>
        </main>
    )
}