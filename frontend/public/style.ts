import styled from 'styled-components';

export const MedicamentoContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
`;

export const MedicamentoHeader = styled.div`
  background-color: #ff7f00;
  color: #fff;
  padding: 8px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

export const MedicamentoBody = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
`;

export const MedicamentoInfo = styled.div`
  flex: 1;
  margin-right: 16px;
`;

export const LicitacaoInfo = styled.div`
  flex: 1;
  margin-right: 16px;
`;

export const NivelEstoque = styled.p`
  font-weight: bold;
`;

export const QuantidadeEstoque = styled.p`
  font-size: 24px;
  color: #ff7f00;
`;

export const SatelliteButton = styled.button`
  background-color: #fff;
  border: 1px solid #ff7f00;
  color: #ff7f00;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #ff7f00;
    color: #fff;
  }
`;

export const StatusLicitacao = styled.p`
  font-weight: bold;
`;

export const PercentualLicitacao = styled.p`
  color: #ff7f00;
`;

export const ProgressBar = styled.div`
  background-color: #ddd;
  border-radius: 4px;
  overflow: hidden;
  height: 16px;
  margin: 8px 0;
`;

export const Progress = styled.div`
  background-color: #4caf50;
  height: 100%;
`;