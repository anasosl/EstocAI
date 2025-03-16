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
  p {
	color: ${theme.colors.laranjaPrincipal};
	text-decoration: none;
	cursor: pointer;
  }

	&:hover {
	  text-decoration: underline;
	}
`;

export const BackgroundImage = styled.img`
  position: absolute;
  bottom: 55px;
  left: 55px;
  width: 400px; 
  height: auto;
  z-index: -2;
`;

export const StorangeOrangeBackground = styled.img`
  position: absolute;
  bottom: -50px;
  right: -50px;
  width: 400px; 
  height: auto;
  z-index: -2;
`;