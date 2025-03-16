import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import assets from '../../assets'; // Importar a imagem
import { BackgroundImage, StorangeOrangeBackground, PageContainer, LoginForm, SignUp, StorangeOrangeLogo, CheckboxContainer } from './style';
import { useNavigate, Link } from 'react-router-dom';
import { Checkbox } from "@mui/material";


export const Login: React.FC = () => {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate('/');
  }

  return (
    <PageContainer>
      <LoginForm>
        <StorangeOrangeLogo src={assets.storangeOrangeLogo} alt="Logo" />
        <h3>Acesse sua conta</h3>
        <form>
          <input type="text" placeholder="Número de telefone ou e-mail" />
          <input type="password" placeholder="Senha" />
          <button onClick={handleLogin}>Entrar</button>
		  <div>
			<CheckboxContainer>
			<input type="checkbox" id="rememberMe"/>
          	<label htmlFor="rememberMe">Lembre-se de mim</label>
		  	</CheckboxContainer>
			<Link to='/Login'>Esqueceu a senha?</Link>
		  </div>
		  
		  
        </form>
      </LoginForm>
      <SignUp>
        <span>Não tem uma conta?</span>
		    <Link to='/Login'>Cadastre-se</Link>
      </SignUp>
      <BackgroundImage src={assets.assetBackground} alt="Background" />
      <StorangeOrangeBackground src={assets.storangeOrangeBackground}/>
    </PageContainer>
  );
};

export default Login;