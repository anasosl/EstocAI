import React from "react";
import assets from '../../assets'; // Importar a imagem
import { BackgroundImage, StorangeOrangeBackground, PageContainer, 
  StorangeOrangeLogo, Texto, Box, Titulo, Inline, Button } from './style';
import { useNavigate } from 'react-router-dom';
import { theme } from "../../styles/theme";
import { InputAdornments } from "../../components";
import { regexEmail } from "../../utils/Regex/regex";
import { caracterCustomizado, emailMask } from "../../utils/Regex/masks";
import { Checkbox } from "@mui/material";
import { useAuth } from "../../context/Auth";

type User = {
  email: string;
  senha: string;
  lembrar?: boolean;
}

export const Login: React.FC = () => {
    const [userData, setUserData] = React.useState({
      email: 'teste@email.com',
      senha: '12345',
    } as User);
    const [errorMessages, setErrorMessages] = React.useState({} as User);
    const { login } = useAuth();
  
    const checkFields = (): boolean => {
      const { email, senha } = userData;
  
      const errors: any = {
        email: !regexEmail.test(email) ? 'Digite o email' : '',
        senha: !senha ? 'Digite a senha' : '',
      };
      setErrorMessages(errors);
  
      const failed = Object.values(errors).some((value: any) => value !== '');
  
      if (failed) {
        alert('Preencha todos os campos corretamente');
        return false;
      }
  
      return true;
    };

  const navigate = useNavigate();
  
  const handleLogin = () => {
    login(userData.email, userData.senha);
  }

  const handleSignUp = () => {
	  navigate('/cadastro', { state: { logged: false } });
  }

  return (
    <PageContainer>
      <Box>
        <StorangeOrangeLogo src={assets.storangeOrangeLogo} alt="Logo" />
        <Titulo>Acesse sua conta</Titulo>

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
          id="input-senha"
          placeholder="Senha"
          value={userData.senha}
          setValue={(text: any) => setUserData({ ...userData, senha: caracterCustomizado(text, 500) })}
          type="password"
          width="100%"
          errorMessage={errorMessages.senha}
        />

        <Button
          onClick={() => {
            const checked = checkFields();
            if (checked) {
              handleLogin();
            }
          }}>Entrar</Button>

          <Inline>
            <Inline $flexDirection="row">
              <Checkbox
                checked={userData.lembrar}
                onChange={(e) => setUserData({ ...userData, lembrar: !userData.lembrar })}
                style={{ color: theme.colors.laranjaPrincipal }}
              />
              <Texto>Lembre-se de mim</Texto>
            </Inline>

            <Texto $marginLeft="0" color={theme.colors.azul373799} $cursor="pointer">Esqueceu a senha ?</Texto>
          </Inline>
        </Box>
      <Box>
        <Inline $justifyContent="center" $padding="16px" $flexDirection="row">
          <Texto>Não tem uma conta ?</Texto>
          <Texto
            color={theme.colors.laranjaPrincipal} 
            fontWeight="bold"
            $cursor="pointer"
            onClick={handleSignUp}>Cadastre-se</Texto>
        </Inline>
      </Box>
      <BackgroundImage src={assets.assetBackground} alt="Background" />
      <StorangeOrangeBackground src={assets.storangeOrangeBackground}/>
    </PageContainer>
  );
};

export default Login;