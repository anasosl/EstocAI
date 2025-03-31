import styled from 'styled-components';
import { theme } from "../../styles/theme";

type Props = {
  width?: string;
  height?: string;
  color?: string;
  fontSize?: string;
  marginLeft?: string;
  padding?: string;
  gap?: string;
  margin?: string;
  borderRadius?: string;
  backgroundColor?: string;
  textAlign?: string;
  justifyContent?: string;
  $flexDirection?: string;
};

export const ContainerPage = styled.div`
  width: 100%;
  padding: 40px;
  background-color: ${theme.colors.corF6F5F8};
`;

export const Inline = styled.div<Props>`
  width: 100%;
  display: flex;
  justify-content: ${(props: any) => props.justifyContent || 'space-between'};
  align-items: flex-start;
  gap: 20px;

  @media screen and (max-width: 1275px) {
    flex-direction: ${(props: any) => props.$flexDirection || 'column'};
  }
`;

export const ContainerBranco = styled.div<Props>`
  width: 100%;
  border-radius: 15px;
  padding: 10px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: ${theme.colors.branco};

  @media screen and (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;

export const ContainerAlertas = styled.div<Props>`
  width: ${(props: any) => props.width || '100%'};
  border-radius: 15px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.branco};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 1275px) {
    width: 100%;
    overflow: auto;
  }
`;

export const MedicamentoContainer = styled.div<Props>`
  width: ${(props: any) => props.width || '100%'};
  border-radius: 15px;
  margin-top: 30px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  //box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid ${theme.colors.preto};

  @media screen and (max-width: 1275px) {
    width: 100%;
    overflow: auto;
  }
`;

export const MedicamentoHeader = styled.div`
  background-color:${theme.colors.laranjaPrincipal};
  color: #fff;
  padding: 14px 10px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  font-size: 12px;
`;

export const MedicamentoBody = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

export const MedicamentoInfo = styled.div`
  flex: 1;
  margin-right: 16px;
`;

export const LicitacaoInfo = styled.div`
  flex: 1;
  margin-right: 16px;
  font-size: 20px;

  h3 {
	margin-bottom: 10px;
	  }
  div {
  p{
	font-size: 15px;
  }
}
`;

export const NivelEstoque = styled.p`
  font-size: 24px;
  font-weight: bold;
`;

export const Texto = styled.p<Props>`
  font-size: ${(props) => props.fontSize || '24px'};
  margin-left: ${(props) => props.marginLeft || '20px'};
  font-weight: bold;
  color:${(props) => props.color || theme.colors.laranjaPrincipal};
  margin: ${(props) => props.margin || '0'};
  text-align: ${(props) => props.textAlign};
`;

export const TextoTopicos = styled.ul<Props>`
  font-size: ${(props) => props.fontSize || '14px'};
  color:${(props) => props.color || theme.colors.preto};
  margin-left: 20px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; 
  margin-top: 15px;
`;

export const SatelliteButton = styled.button`
  background-color: #fff;
  border: 1px solid${theme.colors.laranjaPrincipal};
  color:${theme.colors.laranjaPrincipal};
  padding: 8px 16px;
  font-weight: bold;
  border-radius: 30px;
  cursor: pointer;
  font-size: 10px;

  &:hover {
    background-color:${theme.colors.laranjaPrincipal};
    color: #fff;
  }
`;

export const StatusLicitacao = styled.p`
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const PercentualLicitacao = styled.p`
  color:${theme.colors.laranjaPrincipal};
  font-size: 12px;
`;

export const ProgressBar = styled.div`
  background-color: #ddd;
  border-radius: 15px;
  overflow: hidden;
  height: 16px;
  margin: 15px 0;
  margin-bottom: 40px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

export const Progress = styled.div`
  background-color: #4caf50;
  height: 100%;
`;

export const Linha = styled.div<Props>`
  height: ${(props: any) => props.height || '18px'};
  border-radius: 8px 8px 0 0;
  background-color: ${theme.colors.laranjaPrincipal};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 12px;
`;

export const LinhaGradiente = styled.div<Props>`
  height: ${(props: any) => props.height || '18px'};
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 12px;
  background: linear-gradient(90deg, #FF8C2E 0%, #FFC495 100%);
`;

export const Column = styled.div<Props>`
  width: ${(props: any) => props.width || '100%'};
  display: flex;
  flex-direction: column;
  gap: ${(props: any) => props.gap || '24px'};
  padding: ${(props: any) => props.padding};

  @media screen and (max-width: 1275px) {
    width: 100%;
  }
`;

export const ContainerBox = styled.div<Props>`
  padding: ${(props: any) => props.padding};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
`;

export const Button = styled.button<Props>`
  font-family: ${theme.fonts.abeezee};
  font-size: 1rem;
  font-weight: bold;
  width: ${(props: any) => props.width || '150px'};
  padding: 1rem;
  margin: 0.5rem 0;
  background: ${theme.colors.laranjaPrincipal};
  color: white;
  border: 1px solid #dbdbdb;
  border-radius: ${(props: any) => props.borderRadius || '9px'};	

  &:hover {
    background: ${theme.colors.branco};
    color: ${theme.colors.laranjaPrincipal};
    border: 1px solid ${theme.colors.laranjaPrincipal};
  }
`;