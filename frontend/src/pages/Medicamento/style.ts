import styled from 'styled-components';
import { theme } from "../../styles/theme";

export const MedicamentoContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 15px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
  margin-top: 50px;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const MedicamentoHeader = styled.div`
  background-color:${theme.colors.laranjaPrincipal};
  color: #fff;
  padding: 8px 0px 8px 0px;
  border-top-left-radius: 15px;
  border-bottom-right-radius: 15px;
  width: 80%;
  display: flex;
  justify-content: center;
  font-size: 12px;

`;

export const MedicamentoBody = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0;
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
  font-weight: bold;
  margin-top: 30px;
  margin-left: 20px;
`;

export const QuantidadeEstoque = styled.p`
  font-size: 24px;
  margin-left: 20px;
  font-weight: bold;
  color:${theme.colors.laranjaPrincipal};
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
