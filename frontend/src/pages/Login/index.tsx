import React from "react";
import assets from '../../assets'; // Importar a imagem
import { BackgroundImage, StorangeOrangeBackground, PageContainer, LoginForm, SignUp, StorangeOrangeLogo, CheckboxContainer } from './style';
import { useNavigate } from 'react-router-dom';


export const Login: React.FC = () => {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate('/home', { state: { logged: true } });
  }

  const handleSignUp = () => {
	navigate('/cadastro', { state: { logged: false } });
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
			<p onClick={handleSignUp}>Esqueceu a senha?</p>
		  </div>
		  
		  
        </form>
      </LoginForm>
      <SignUp>
        <span>Não tem uma conta?</span>
		    <p onClick={handleSignUp}>Cadastre-se</p>
      </SignUp>
      <BackgroundImage src={assets.assetBackground} alt="Background" />
      <StorangeOrangeBackground src={assets.storangeOrangeBackground}/>
    </PageContainer>
  );
};

export default Login;