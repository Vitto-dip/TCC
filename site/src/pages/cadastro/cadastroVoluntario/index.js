import "./index.scss";

import { useState } from "react";

import LogoHorizontal from "../../../components/logos";
import InputsVoluntario from "../../../components/cadastro/voluntario";
import { useNavigate, useParams } from "react-router-dom";
import { carregarVoluntario } from "../../../api/voluntarioApi.js";
import { Link } from "react-router-dom";

import { cadastroVoluntario } from "../../../api/voluntarioApi";
import { toast, Toaster } from 'react-hot-toast'
import "react-toastify/dist/ReactToastify.css";

export default function CadastroVoluntario() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [vagas, setVagas] = useState(0);
  const [crp, setCrp] = useState("");
  const [termos, setTermos] = useState(false);
  const [erro, setErro] = useState("");
  
  const navigate = useNavigate();

  async function cadastro() {
    try {
      if (termos === true) {
        const resposta = await cadastroVoluntario(
          email,
          senha,
          nome,
          cpf,
          nascimento,
          telefone,
          vagas,
          crp
        );
        setErro("");
        toast.success("Dados enviados para revisão");
        navigate('/login/voluntario')
      } else {
        setErro(
          "É necessário ler e concordar com a política de privacidade para continuar."
        );
      }
    } catch (err) {
      toast.error(err.response.data.erro);
    }
  }

  return (
    <main className="cadastro-voluntario">
      <Toaster />
      <section className="secao1">
        <div className="logonat">
          <LogoHorizontal />
        </div>
        <img src="/assets/images/purplewoman.png" alt="" />
        <div className="s1-alinhamento-texto">
          <p>
            Ao cadastrar-se como um psicólogo voluntário é necessário que saiba:
          </p>
          <p>
            O NAT(Need a Talk) é uma instituição privada sem fins lucrativos,
            com objetivo de atuar em áreas onde o poder público não chega, sendo
            assim, não receberá nenhum tipo de remuneração;
          </p>
          <p>
            Nosso real objetivo é poder levar apoio psicológico e possíveis
            tratamentos para pessoas que não tem condições para pagar por
            consulta; visamos o acesso dos mais carentes e moradores da
            periferia. Em um mundo onde ansiedade e depressão andam lado a lado,
            nos mobilizamos a ajudar todos, estender nossas mãos e fazer com que
            todos possam ter a oportunidade de tratar sua saúde mental.
          </p>
          <p>
            Precisaremos do número de seu CRP, para que possamos ter mais
            segurança e saber se você, profissional, possui registro ativo para
            atuar como psicólogo(a).
          </p>
          <p>
            Você passará por um processo avaliativo, podendo ter resultado em
            apenas 3 dias úteis. Neste tempo, verificaremos seus dados e se
            poderá contribuir com nossa organização. Enviaremos o resultado para
            o e-mail cadastrado.
          </p>
        </div>
        <Link to="/home/login">Voltar para a página inicial</Link>
      </section>
      <section className="secao2">
        <div className="logonat">
          <LogoHorizontal />
        </div>
        <InputsVoluntario
          info="Nome"
          placeholder="Nome e sobrenome"
          valor={nome}
          onchange={(e) => setNome(e.target.value)}
        />
        <InputsVoluntario
          info="CRP"
          placeholder="XX/00000"
          valor={crp}
          onchange={(e) => setCrp(e.target.value)}
        />
        <InputsVoluntario
          info="CPF"
          placeholder="000.000.000-00"
          valor={cpf}
          onchange={(e) => setCpf(e.target.value)}
        />
        <InputsVoluntario
          info="Nascimento"
          type="date"
          valor={nascimento}
          onchange={(e) => setNascimento(e.target.value)}
        />
        <InputsVoluntario
          info="E-mail"
          placeholder="email@email"
          valor={email}
          onchange={(e) => setEmail(e.target.value)}
        />
        <InputsVoluntario
          info="Senha"
          placeholder="*************"
          valor={senha}
          onchange={(e) => setSenha(e.target.value)}
        />
        <InputsVoluntario
          info="Telefone"
          placeholder="(11)99999-9999"
          valor={telefone}
          onchange={(e) => setTelefone(e.target.value)}
        />

        <div className="s2-alinhamento-inputs">
          <label>Qtd. de pacientes que pode atender</label>
          <select value={vagas} onChange={(e) => setVagas(e.target.value)}>
            <option selected disable hidden>
              Selecione
            </option>
            <option value="1" key="">
              1-5
            </option>
            <option value="2" key="">
              5-10
            </option>
            <option value="3" key="">
              10-20 ou mais
            </option>
          </select>
        </div>

        <div className="s2-radio">
          <input
            type="checkbox"
            onChange={(e) => setTermos(e.target.checked)}
          />
          <label>
            Eu li e concordo com a <span>política de privacidade</span>.
          </label>
        </div>
        <div className="button-cadastro">
          <button onClick={cadastro}>Cadastrar-se</button>
          <span>{erro}</span>
        </div>
      </section>
    </main>
  );
}
