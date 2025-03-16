import styled from 'styled-components';
import { theme } from "../../styles/theme";

export const PageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 90vh;
  overflow: hidden; // Adicionado para evitar barra de rolagem
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1;
  a {
	color: ${theme.colors.laranjaPrincipal};
	text-decoration: none;
	&:hover {
	  text-decoration: underline;
	}
`;

export const StorangeOrangeLogo = styled.img`
  width: 250px; 
  height: auto;
  z-index: -1; // Ajustado para garantir que a imagem fique atrás do container
`;

export const BackgroundImage = styled.img`
  position: absolute;
  bottom: 55px;
  left: 55px;
  width: 400px; 
  height: auto;
  z-index: -2; // Ajustado para garantir que a imagem fique atrás do container
`;

export const StorangeOrangeBackground = styled.img`
  position: absolute;
  bottom: -50px;
  right: -50px;
  width: 400px; 
  height: auto;
  z-index: -2; // Ajustado para garantir que a imagem fique atrás do container
`;

export const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 530px;
  height: 510px;
  z-index: 2;

  form {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 80%;
  }

  h3 {
    margin: 2rem 0;
	color: ${theme.colors.preto423C2C};
  }

  input {
    width: 100%;
    padding: 1rem;
    margin: 0.5rem 0;
    background: #fafafa;
    border: 1px solid #dbdbdb;
    border-radius: 9px;
  }
  button {
    font-family: "ABeeZee",sans-serif;
    font-size: 1rem;
    font-weight: bold;
    width: 100%;
    padding: 1rem;
    margin: 0.5rem 0;
    background: ${theme.colors.laranjaPrincipal};
    color: white;
    border: 1px solid #dbdbdb;
    border-radius: 9px;	
  	margin-bottom: 20px;
	}
  div {
	display: flex;
	flex-direction: row;
	width: 100%;
}
  a{
    font-size: 12px;
	width: 150px;
  }
`;
export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  

  input {
	align-self: center;
	justify-self: center;
    margin: 0;
	width: 10px;
	height: 10px;
	margin-right: 10px;
	margin-bottom: 2px;
  }

  label {
	color: ${theme.colors.preto423C2C};
	font-size: 12px;
	align-self: center;
	justify-self: center;
  }
`;

export const SignUp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 30px;
  color: ${theme.colors.laranjaPrincipal};
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 530px;
  z-index: 2;

  span {
    display: inline;
	color: ${theme.colors.preto423C2C};
	margin-right: 10px;
  }  
`;

