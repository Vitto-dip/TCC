import "./index.scss";
import Menu from "../../../components/home";
import HeaderAdmin from "../../../components/adm/header";
import CardsAdmin from "../../../components/adm/cards";
import { denunciaPsico } from "../../../api/adminApi";
import { useEffect, useState } from "react";

export default function DenunciasPsicologos() {
  const [denuncia, setDenuncia] = useState([]);
  console.log(denuncia)
  async function carregarDenunciasPsicologo() {
    const resp = await denunciaPsico();
    setDenuncia(resp);
    
  }

  useEffect(() => {
    carregarDenunciasPsicologo()
  }, [])

  

  return (
    <main className="adm-cadastros-principal">
      <div className="menu">
        <Menu selecionado="Denúncia Psicólogo" Menu="Denúncia Psicólogo" />
      </div>
      

      <section className="adm-cad-section">
        <HeaderAdmin />
        
        <div className="section-cadastros">
          {denuncia.map(item => 
            <CardsAdmin 
            DenunciaId={item.denuncia}
            PsicologoDenuncia={item.psicologo}
            css="card-denuncia-psicologo"
            tipo= "denuncia-psicologo"
            nomePsi={item.nomepsi}
            nomeUsuario={item.nome}
            emailPsi={item.emailpsicologo}
            emailUsuario={item.email}
            depoimento={item.depoimento}
            />
            
            )}

        </div>
      </section>
    </main>
  );
}