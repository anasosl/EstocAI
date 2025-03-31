import React from 'react';
import Estrelas from "../../assets/Estrelas.svg";
import AlertaTriangulo from "../../assets/AlertaTriangulo.svg";
import {
  MedicamentoContainer,
  MedicamentoHeader,
  MedicamentoBody,
  MedicamentoInfo,
  NivelEstoque,
  Texto,
  Linha,
  Inline,
  ContainerPage,
  ContainerBox,
  Column,
  ContainerBranco,
  Button,
  ContainerAlertas,
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
  nivel_estoque = 21.726,
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
    <ContainerPage>
      <Inline>
        <Column width='65%'>
        <MedicamentoContainer>      
          <MedicamentoHeader>
            <h2>Dashboard de Estoque - {nome_medicamento}</h2>
          </MedicamentoHeader>

          <Column padding='14px'>
            <MedicamentoInfo>
              <NivelEstoque>Nível de estoque</NivelEstoque>
              <Texto color={theme.colors.azul000080} fontSize="34px">{nivel_estoque.toLocaleString()} caixas (Total)</Texto>
            </MedicamentoInfo>

            <MedicamentoBody>
              <MedicamentoInfo>
                <Texto color={theme.colors.preto} fontSize="20px">Almoxarifado</Texto>
                <Texto color={theme.colors.preto} fontSize="18px">15,000 caixas</Texto>
              </MedicamentoInfo>
              <MedicamentoInfo>
                <Texto color={theme.colors.preto} fontSize="20px">Setor Prediário</Texto>
                <Texto color={theme.colors.preto} fontSize="18px">2,000 caixas</Texto>
              </MedicamentoInfo>
            </MedicamentoBody>

            <MedicamentoBody>
              <MedicamentoInfo>
                <Texto color={theme.colors.preto} fontSize="20px">Pronto Socorro</Texto>
                <Texto color={theme.colors.preto} fontSize="18px">3,000 caixas</Texto>
              </MedicamentoInfo>
              <MedicamentoInfo>
                <Texto color={theme.colors.preto} fontSize="20px">Clínica Médica</Texto>
                <Texto color={theme.colors.preto} fontSize="18px">-</Texto>
              </MedicamentoInfo>
            </MedicamentoBody>
          </Column>
        </MedicamentoContainer>

        <ContainerBranco>
          <Column gap="8px">
            <Texto marginLeft="0" fontSize="16px" color={theme.colors.preto}>Estoques devem atingir ponto de reabastecimento nos próximos 2 meses.</Texto>
            <Texto marginLeft="0" fontSize="16px" color={theme.colors.preto}>Ação recomendada: iniciar novo pedido de compra.</Texto>
          </Column>
          <Button>Fazer pedido</Button>
        </ContainerBranco>

        <MedicamentoContainer width="800px">
          <Linha height="50px">
            <Texto marginLeft="0" fontSize="16px" color={theme.colors.branco}>Movimentação do estoque Paracetamol - 12 meses</Texto>
          </Linha>
          <ContainerBox padding="16px">
            <GraficoLinha />
          </ContainerBox>
        </MedicamentoContainer> 

        <MedicamentoContainer width="800px">
          <Linha height="50px">
            <Texto marginLeft="0" fontSize="16px" color={theme.colors.branco}>Visualização do estoque por satélite</Texto>
          </Linha>
          <ContainerBox padding="16px">
            <GraficoBarra />
          </ContainerBox>
        </MedicamentoContainer> 
      </Column>

      <Column width='30%'>
        <ContainerAlertas>
          <LinhaGradiente />
          <ContainerBox padding="16px">
            <Inline justifyContent="flex-start" $flexDirection="row">
              <img src={Estrelas} alt="estrelas" width={50}/>
              <Texto marginLeft="0" fontSize="16px" color={theme.colors.preto} margin="8px 0 0 -8px" textAlign="center">Você pode visualizar o relatório completo em formato de texto</Texto>
            </Inline>

            <Button width='80%' borderRadius="30px">Visualizar relatório</Button>
          </ContainerBox>
        </ContainerAlertas>
        
        <ContainerAlertas>
          <LinhaGradiente />
          <ContainerBox padding="16px">
            <Inline justifyContent="flex-start" $flexDirection="row">
              <img src={AlertaTriangulo} alt="alerta" width={33}/>
              <Texto marginLeft="0" fontSize="16px" color={theme.colors.preto} margin="8px 0 0 -8px" textAlign="center">Percebeu algum erro na contagem?</Texto>
            </Inline>

            <Button width='80%' borderRadius="30px">Reportar erro</Button>
          </ContainerBox>
        </ContainerAlertas>
      </Column>
      </Inline>

      
    </ContainerPage>
  );
};

export default MedicamentoPage;
