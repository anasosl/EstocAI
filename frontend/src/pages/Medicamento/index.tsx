import React from 'react';
import assets from '../../assets';
import {
  MedicamentoContainer,
  MedicamentoHeader,
  MedicamentoBody,
  MedicamentoInfo,
  LicitacaoInfo,
  NivelEstoque,
  QuantidadeEstoque,
  ButtonContainer,
  SatelliteButton,
  StatusLicitacao,
  PercentualLicitacao,
  ProgressBar,
  Progress
} from './style';

interface MedicamentoPageProps {
  nome_medicamento?: string;
  nivel_estoque?: number;
  status_licitacao?: number;
  fornecedores?: string[];
  relatorio_inteligente?: string[];
}

const MedicamentoPage: React.FC<MedicamentoPageProps> = ({
  nome_medicamento = "Paracetamol",
  nivel_estoque = 21726,
  status_licitacao = 0.4,
  fornecedores = ["Farmácia 1", "Farmácia 2", "Farmácia 2"],
  relatorio_inteligente = [
    "Alta Demanda: O uso de Paracetamol e Dipirona aumentou em 18%, refletindo um crescimento nos atendimentos de síndromes gripais.",
    "Estoque Crítico: Medicamentos antibióticos, como Amoxicilina e Azitromicina, estão com níveis reduzidos, exigindo reposição em até 15 dias para evitar desabastecimento.",
    "Redução no Consumo: Anti-hipertensivos como Losartana tiveram uma queda de 12%, possivelmente devido a mudanças nos protocolos de prescrição.",
    "Picos Sazonais: O consumo de antialérgicos subiu 25% devido ao aumento de casos relacionados à polinização sazonal e mudanças climáticas."
  ],
}) => {
  return (
    <MedicamentoContainer>      
      <MedicamentoBody>
        <MedicamentoInfo>
		<MedicamentoHeader>
			<h2>{nome_medicamento}</h2>
		</MedicamentoHeader>
          <NivelEstoque>Nível de estoque</NivelEstoque>
          <QuantidadeEstoque>{nivel_estoque.toLocaleString()} caixas (Total)</QuantidadeEstoque>
          <ButtonContainer>
			<SatelliteButton>Visualizar por satélite</SatelliteButton>
		  </ButtonContainer>
        </MedicamentoInfo>
        <LicitacaoInfo>
          <StatusLicitacao>Status da licitação</StatusLicitacao>
          <PercentualLicitacao>{(status_licitacao * 100).toFixed(0)}% das caixas já foram solicitadas</PercentualLicitacao>
          <ProgressBar>
            <Progress style={{ width: `${status_licitacao * 100}%` }}></Progress>
          </ProgressBar>
          <h3>Fornecedores</h3>
          <div>
            {fornecedores.map((fornecedor, index) => (
              <p key={index} style={{ textDecoration: 'underline' }}>{fornecedor}</p>
            ))}
          </div>
        </LicitacaoInfo>
      </MedicamentoBody>
    </MedicamentoContainer>
  );
};

export default MedicamentoPage;
