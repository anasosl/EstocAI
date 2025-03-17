/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import assets from '../../assets'; // Importar a imagem
import { Box, Button, Inline, PageContainer, StorangeOrangeBackground, StorangeOrangeLogo, Texto, Titulo } from "./style";
import { InputAdornments } from "../../components";
import { caracterCustomizado, cepMask, emailMask, phoneMask } from "../../utils/Regex/masks";
import { Checkbox } from "@mui/material";
import { theme } from "../../styles/theme";
import axios, { AxiosResponse } from "axios";
import { regexEmail } from "../../utils/Regex/regex";

type User = {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  endereco: string;
  cep: string;
  cidade: string;
  estado: string;
  termo: string;
  telefone: string;
}

export const Cadastro: React.FC = () => {
  const [userData, setUserData] = React.useState({} as User);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorMessages, setErrorMessages] = React.useState({} as User);

  const checkFields = (): boolean => {
    const { nome, email, senha, confirmarSenha, endereco, cep, cidade, estado, termo, telefone } = userData;

    const errors: any = {
      nome: !nome || nome?.length < 3 ? 'Digite seu nome' : '',
      telefone: !telefone || telefone?.length < 11 ? 'Digite um telefone válido' : '',
      email: !regexEmail.test(email) ? 'Digite um email válido' : '',
      senha: !senha ? 'Digite a senha' : '',
      confirmarSenha: (senha !== confirmarSenha) ? 'As senhas devem ser iguais.' : '',
      cep: !cep || cep.length < 9 ? 'Digite o CEP' : '',
      cidade: !cidade || cidade?.length < 3 ? 'Digite a cidade' : '',
      estado: !estado || estado?.length < 2 ? 'Digite o país' : '',
      endereco: !endereco || endereco?.length < 3 ? 'Digite o endereço' : '',
    };
    setErrorMessages(errors);

    const failed = Object.values(errors).some((value: any) => value !== '');

    if (failed) {
      alert('Preencha todos os campos corretamente');
      return false;
    }

    if (!termo) {
      alert('Aceite os termos de privacidade');
      return false;
    }

    return true;
  };

  const puxarCEP = async () => {
    await axios.get(`https://viacep.com.br/ws/${userData.cep}/json/`).then((res: AxiosResponse) => {
      console.log(res.data);
      setUserData({
        ...userData,
        cidade: res.data.localidade,
        estado: res.data.estado,
      });
    }).catch((err: any) => {
      console.log(err?.response?.data?.messages[0]);
    });
  };

  useEffect(() => {
    puxarCEP();
  }, [userData.cep]);

  return (
    <PageContainer>
      <Box>
        <StorangeOrangeLogo src={assets.storangeOrangeLogo} alt="Logo" />
        <Titulo>Registre sua empresa</Titulo>
        <InputAdornments
          id="input-nome"
          placeholder="Nome da empresa"
          value={userData.nome}
          setValue={(text: any) => setUserData({ ...userData, nome: caracterCustomizado(text, 50) })}
          type="text"
          width="100%"
          errorMessage={errorMessages.nome}
        />

        <Inline>
          <InputAdornments
              id="input-cep"
              placeholder="CEP"
              value={userData.cep}
              setValue={(text: any) => setUserData({ ...userData, cep: cepMask(text) })}
              type="text"
              width="100%"
              errorMessage={errorMessages.cep}
            />
            <InputAdornments
              id="input-cidade"
              placeholder="Cidade"
              value={userData.cidade}
              setValue={(text: any) => setUserData({ ...userData, cidade: caracterCustomizado(text, 50) })}
              type="text"
              width="100%"
              errorMessage={errorMessages.cidade}
            />

            <InputAdornments
              id="input-estado"
              placeholder="estado"
              value={userData.estado}
              setValue={(text: any) => setUserData({ ...userData, estado: caracterCustomizado(text, 50) })}
              type="text"
              width="100%"
              errorMessage={errorMessages.estado}
            />
        </Inline>

        <InputAdornments
          id="input-endereco"
          placeholder="Endereço da empresa"
          value={userData.endereco}
          setValue={(text: any) => setUserData({ ...userData, endereco: caracterCustomizado(text, 50) })}
          type="text"
          width="100%"
          errorMessage={errorMessages.endereco}
        />

        <Inline>
          <InputAdornments
              id="input-email"
              placeholder="Email"
              value={userData.email}
              setValue={(text: any) => setUserData({ ...userData, email: emailMask(text) })}
              type="text"
              width="100%"
              errorMessage={errorMessages.email}
            />
            <InputAdornments
              id="input-telefone"
              placeholder="Telefone para contato"
              value={userData.telefone}
              setValue={(text: any) => setUserData({ ...userData, telefone: phoneMask(text) })}
              type="text"
              width="100%"
              errorMessage={errorMessages.telefone}
            />
        </Inline>

        <Inline>
          <InputAdornments
              id="input-senha"
              placeholder="Senha"
              value={userData.senha}
              setValue={(text: any) => setUserData({ ...userData, senha: caracterCustomizado(text, 500) })}
              type="password"
              width="100%"
              errorMessage={errorMessages.senha}
            />
            <InputAdornments
              id="input-confirmar-senha"
              placeholder="Confirmar senha"
              value={userData.confirmarSenha}
              setValue={(text: any) => setUserData({ ...userData, confirmarSenha: caracterCustomizado(text, 500) })}
              type="password"
              width="100%"
              errorMessage={errorMessages.confirmarSenha}
            />
        </Inline>

        <Inline $justifyContent="flex-start" $flexDirection="row">
          <Checkbox
            checked={userData.termo === 'checked'}
            onChange={(e) => setUserData({ ...userData, termo: e.target.checked ? 'checked' : '' })}
            style={{ color: theme.colors.laranjaPrincipal }}
          />
          <Texto>Eu li e aceito os termos de privacidade</Texto>
        </Inline>
        <Button onClick={() => {
          const checked = checkFields();
          if (checked) {
            alert('Cadastro realizado com sucesso!');
            window.location.replace("/");
          }
        }}>Cadastrar</Button>
      </Box>

      <Box>
        <Inline $justifyContent="center" $padding="16px" $flexDirection="row">
          <Texto>Possui uma conta ?</Texto>
          <Texto 
            color={theme.colors.laranjaPrincipal} 
            fontWeight="bold"
            $cursor="pointer"
            onClick={() => window.location.replace("/")}>Conecte-se</Texto>
        </Inline>
      </Box>
      <StorangeOrangeBackground src={assets.storangeOrangeBackground}/>
    </PageContainer>
  );
};

export default Cadastro;