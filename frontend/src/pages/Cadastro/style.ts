import styled from 'styled-components';
import { theme } from "../../styles/theme";

type Props = {
  $justifyContent?: string;
  fontWeight?: string;
  $padding?: string;
  $cursor?: string;
  $flexDirection?: string;
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
  padding: 50px 0;
  z-index: 1;
`;

export const Box = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${theme.colors.branco};
  border: 2px solid #DBDBDB;
  padding: 16px;
  border-radius: 16px;
  gap: 16px;

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

export const Titulo = styled.h3`
  font-family: ${theme.fonts.alata};
  font-size: 24px;
  color: ${theme.colors.preto};
`;

export const StorangeOrangeLogo = styled.img`
  width: 250px; 
`;

export const StorangeOrangeBackground = styled.img`
  position: absolute;
  bottom: -50px;
  right: -50px;
  width: 400px; 
  height: auto;
  z-index: -1;
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
  }
`;

export const Texto = styled.p<Props>`
  font-size: 14px;
  color: ${({color}) => color || theme.colors.cinzaEscuro};
  font-weight: ${({fontWeight}) => fontWeight || 'normal'};
  margin-left: -8px;
  cursor: ${({$cursor}) => $cursor};
`;

export const Button = styled.button `
  font-family: ${theme.fonts.abeezee};
  font-size: 1rem;
  font-weight: bold;
  width: 150px;
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