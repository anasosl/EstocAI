import React from 'react';
import Estrelas from "../../assets/Estrelas.svg";
import {
  MedicamentoContainer,
  MedicamentoHeader,
  MedicamentoBody,
  MedicamentoInfo,
  LicitacaoInfo,
  NivelEstoque,
  Texto,
  ButtonContainer,
  SatelliteButton,
  StatusLicitacao,
  PercentualLicitacao,
  ProgressBar,
  Progress,
  Linha,
  Inline,
  ContainerPage,
  TextoTopicos,
  ContainerBox,
  LinhaGradiente,
} from './style';
import { theme } from '../../styles/theme';
import { GraficoBarra, GraficoLinha } from '../../components';

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
  fornecedores = ["Farmácia 1", "Farmácia 2", "Farmácia 3"],
  relatorio_inteligente = [
    "Alta Demanda: O uso de Paracetamol e Dipirona aumentou em 18%, refletindo um crescimento nos atendimentos de síndromes gripais.",
    "Estoque Crítico: Medicamentos antibióticos, como Amoxicilina e Azitromicina, estão com níveis reduzidos, exigindo reposição em até 15 dias para evitar desabastecimento.",
    "Redução no Consumo: Anti-hipertensivos como Losartana tiveram uma queda de 12%, possivelmente devido a mudanças nos protocolos de prescrição.",
    "Picos Sazonais: O consumo de antialérgicos subiu 25% devido ao aumento de casos relacionados à polinização sazonal e mudanças climáticas."
  ],
}) => {
  return (
    <ContainerPage>
      <Inline style={{ display: "flex", alignItems: "stretch" }}>
        <MedicamentoContainer width="60%" style={{ display: "flex", flexDirection: "column" }}>
          <MedicamentoBody style={{ flex: 1 }}>
            <MedicamentoInfo>
              <MedicamentoHeader>
                <h2>{nome_medicamento}</h2>
              </MedicamentoHeader>
              <NivelEstoque>Nível de estoque</NivelEstoque>
              <Texto>{nivel_estoque.toLocaleString()} caixas (Total)</Texto>
              <ButtonContainer>
                <SatelliteButton>Visualizar por satélite</SatelliteButton>
              </ButtonContainer>
            </MedicamentoInfo>
            <LicitacaoInfo>
              <StatusLicitacao>Status da licitação</StatusLicitacao>
              <PercentualLicitacao>{(status_licitacao * 100).toFixed(0)}% das caixas já foram solicitadas</PercentualLicitacao>
              <ProgressBar>
                <Progress style={{ width: `${status_licitacao * 100}%` }} />
              </ProgressBar>
              <h3>Fornecedores</h3>
              <div>
                {fornecedores.map((fornecedor, index) => (
                  <p key={index} style={{ textDecoration: "underline" }}>{fornecedor}</p>
                ))}
              </div>
            </LicitacaoInfo>
          </MedicamentoBody>
        </MedicamentoContainer>

        <MedicamentoContainer width="40%" style={{ display: "flex", flexDirection: "column" }}>
          <LinhaGradiente />
          <ContainerBox padding="16px" style={{ flex: 1 }}>
            <Inline noColumn>
              <img src={Estrelas} alt="Pesquisar" width={100} />
              <Texto marginLeft="0" fontSize="16px">
                Com base nos dados analisados nos últimos três meses, observamos algumas tendências
              </Texto>
            </Inline>
            <TextoTopicos>
              <li><strong>Alta Demanda:</strong> O uso de Paracetamol e Dipirona aumentou em 18%, refletindo um crescimento nos atendimentos de síndromes gripais.</li>
              <li><strong>Estoque Crítico:</strong> Medicamentos antibióticos, como Amoxicilina e Azitromicina, estão com níveis reduzidos, exigindo reposição em até 15 dias para evitar desabastecimento.</li>
              <li><strong>Redução no Consumo:</strong> Anti-hipertensivos como Losartana tiveram uma queda de 12%, possivelmente devido a mudanças nos protocolos de prescrição.</li>
              <li><strong>Picos Sazonais:</strong> O consumo de antialérgicos subiu 25% devido ao aumento de casos relacionados à polinização sazonal e mudanças climáticas.</li>
            </TextoTopicos>
          </ContainerBox>
        </MedicamentoContainer>
      </Inline>


        <MedicamentoContainer width="100%">
          <Linha height="50px">
            <Texto marginLeft="0" fontSize="16px" color={theme.colors.branco}>Movimentação do estoque Paracetamol - 12 meses</Texto>
          </Linha>
          <ContainerBox padding="16px">
            <GraficoLinha />
          </ContainerBox>
        </MedicamentoContainer> 

        <MedicamentoContainer width="100%">
          <Linha height="50px">
            <Texto marginLeft="0" fontSize="16px" color={theme.colors.branco}>Visualização do estoque por satélite</Texto>
          </Linha>
          <ContainerBox padding="16px">
            <GraficoBarra />
          </ContainerBox>
        </MedicamentoContainer> 
    </ContainerPage>
  );
};

export default MedicamentoPage;
