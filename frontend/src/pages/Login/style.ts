import styled from 'styled-components';
import { theme } from "../../styles/theme";

type Props = {
  $justifyContent?: string;
  fontWeight?: string;
  $padding?: string;
  $cursor?: string;
  $flexDirection?: string;
  $marginLeft?: string;
}

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: ${theme.colors.corF6F5F8};
  z-index: 1;
`;

export const StorangeOrangeLogo = styled.img`
  width: 250px; 
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

export const Box = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${theme.colors.branco};
  border: 2px solid #DBDBDB;
  padding: 16px 40px;
  border-radius: 16px;
  gap: 16px;

  @media screen and (max-width: 1000px) and (min-width: 768px) {
    width: 60%;
  }

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

export const Titulo = styled.h3`
  font-family: ${theme.fonts.alata};
  font-size: 20px;
  color: ${theme.colors.cor3F3F3F};
  font-weight: bold;
`;

export const Button = styled.button `
  font-family: ${theme.fonts.abeezee};
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

  &:hover {
    background: ${theme.colors.branco};
    color: ${theme.colors.laranjaPrincipal};
    border: 1px solid ${theme.colors.laranjaPrincipal};
  }
`;

export const Inline = styled.div<Props>`
  width: 100%;
  display: flex;
  justify-content: ${({$justifyContent}) => $justifyContent};
  align-items: center;
  gap: 10px;
  padding: ${({$padding}) => $padding || '0'};

  @media screen and (max-width: 768px) {
    flex-direction: ${({$flexDirection}) => $flexDirection || 'column'};
    align-items: center;
    justify-content: center;
  } 

  .css-i4bv87-MuiSvgIcon-root{
    width: 1.2rem;
    height: 1.2rem;
    color: ${theme.colors.laranjaPrincipal};
    margin-left: -8px;
  }
`;

export const Texto = styled.p<Props>`
  font-size: 14px;
  color: ${({color}) => color || theme.colors.cinzaEscuro};
  font-weight: ${({fontWeight}) => fontWeight || 'normal'};
  margin-left: ${({$marginLeft}) => $marginLeft || '-8px'};
  cursor: ${({$cursor}) => $cursor};
  white-space: nowrap;
`;
