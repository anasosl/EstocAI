import React, { useEffect, useState } from 'react';
import Estrelas from "../../assets/Estrelas.svg";
import styled from "styled-components";
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
  RelatorioBox,
  ReportCard,
  ReportHeader,
  BulletList,
  BulletItem,

} from './style';
import { theme } from '../../styles/theme';
import { GraficoBarra, GraficoLinha, MedicamentoType, LicitacaoStatus } from '../../components';
import { useParams } from 'react-router-dom';
import axios from "axios";

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
  const [ata, setAta] = useState<any[]>([]);
  const [empenhos, setEmpenhos] = useState<any[]>([]);
  const [medicamento, setMedicamento] = useState<any>();
  const [inputAI, setInputAI] = useState<any>();
  const { id } = useParams<{ id: string }>();
  const [nivelEstoque, setNivelEstoque] = useState<number>(21726);
  const [licitacoes, setLicitacoes] = useState<any[]>([]);
  const [report, setReport] = useState<string>("");
  const months = -40;

  useEffect(() => {
    fetch('/mocks/csv/medicamentos.csv')
      .then((res) => res.text())
      .then((text) => {
        const json = csvToJson(text);
        setMedicamento(json.find((item: any) => item.id_medicamento === id));
        console.log('CSV convertido para JSON:', json);
      });

    fetch('/mocks/csv/empenhos.csv')
      .then((res) => res.text())
      .then((text) => {
        const json = csvToJson(text);
        setEmpenhos(json);
        console.log('CSV convertido para JSON:', json);
      });

    fetch('/mocks/csv/atas_registro_precos.csv')
      .then((res) => res.text())
      .then((text) => {
        const json = csvToJson(text);
        setAta(json.filter((item: any) => item.id_medicamento === id));
        console.log('CSV convertido para JSON:', json);
      });

    fetch('/mocks/csv/input_ia.csv')
      .then((res) => res.text())
      .then((text) => {
        const json = csvToJson(text);
        const filteredData = json.filter((item: any) => item.id_medicamento === id);
        setInputAI({
          allDados: filteredData,
          dadosX: filteredData?.map((item: any) => item.timestamp.split('-').reverse().join('/')),
          dadosY: filteredData?.map((item: any) => item.quantidade),
        });

        if (filteredData.length > 0) {
          const ultimoItem = filteredData[filteredData.length - 1];
          const quantidade = parseInt(ultimoItem.quantidade, 10);
          if (!isNaN(quantidade)) {
            setNivelEstoque(quantidade);
          }
        }

        setLicitacoes([
          ["Farmácia Medfarma", "05/02/25", "500 caixas", "0.4"],
          ["Farmácia BelaCruz", "12/10/24", "200 caixas", "0.7"],
          ["Farmácia Panfarma", "16/10/24", "300 caixas", "0.2"],
          ["Farmácia Filadelfia", "7/10/24", "100 caixas", "0.9"],
          ["Farmácia Pain", "2/10/24", "400 caixas", "0.53"],
          ["Farmácia Montecarlos", "26/10/25", "600 caixas", "0.75"],
          ["Farmácia Fernando", "13/10/26", "50 caixas", "0.35"],

        ])
      });
  }, []);

  const csvToJson = (csv: string) => {
    const [header, ...rows] = csv.split("\n").map(row => row.trim()); // Remove espaços extras

    return rows.map(row => {
      const values = row.split(","); // Supondo que seja separado por vírgula
      return header.split(",").reduce((acc, key, index) => {
        acc[key] = values[index] || ""; // Garante que valores vazios sejam preenchidos corretamente
        return acc;
      }, {} as Record<string, string>);
    });
  };

  const fetchReport = async (name: string) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/model/report/${name}`);
      const reportText = response.data.data.result;
      setReport(reportText as string);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  };

  useEffect(() => {
    if (medicamento?.nome_medicamento) {
      fetchReport(medicamento.nome_medicamento);
    }
  }, [medicamento]);

  return (
    <ContainerPage>
      <Inline style={{ display: "flex", alignItems: "stretch" }}>
        <MedicamentoContainer width="30%" style={{ display: "flex", flexDirection: "column" }}>
          <MedicamentoBody style={{ flex: 1 }}>
            <MedicamentoInfo>
              <MedicamentoHeader>
                <h2>{medicamento?.nome_medicamento}</h2>
              </MedicamentoHeader>
              <NivelEstoque>Nível de estoque</NivelEstoque>
              <Texto>{nivelEstoque.toLocaleString()} caixas (Total)</Texto>
              <MedicamentoType type={medicamento?.tipo} />
            </MedicamentoInfo>
          </MedicamentoBody>
        </MedicamentoContainer>

        <MedicamentoContainer width="30%" style={{ display: "flex", flexDirection: "column" }}>
          <MedicamentoBody style={{ flex: 1 }}>
            <MedicamentoInfo>
              <MedicamentoHeader>
                <h2>Status das licitações</h2>
              </MedicamentoHeader>
              <LicitacaoStatus
                licitacoes={licitacoes} />
            </MedicamentoInfo>
          </MedicamentoBody>
        </MedicamentoContainer>

        <MedicamentoContainer width="40%" style={{ display: "flex", flexDirection: "column" }}>
          <LinhaGradiente />
          <RelatorioBox padding="16px" style={{ flex: 1 }}>
            <ReportHeader>
              <Inline>
                <img src={Estrelas} alt="Pesquisar" width={70} />
                Com base nos dados analisados nos últimos meses, observamos:
              </Inline>
            </ReportHeader>
            {report ? (
              <div
                style={{ whiteSpace: "pre-line" }}
                dangerouslySetInnerHTML={{ __html: report }} // Agora tratando como string
              />
            ) : (
              <p>Carregando relatório...</p>
            )}
          </RelatorioBox>
        </MedicamentoContainer>
      </Inline>

      <Inline style={{ display: "flex", alignItems: "stretch" }}>
        <MedicamentoContainer width="100%">
          <Linha height="50px">
            <Texto marginLeft="0" fontSize="16px" color={theme.colors.branco}>Movimentação do estoque {medicamento?.nome_medicamento}</Texto>
          </Linha>
          <ContainerBox padding="16px">
            {inputAI?.dadosX && inputAI?.dadosY && <GraficoLinha dadosX={inputAI?.dadosX.slice(months)} dadosY={inputAI?.dadosY.slice(months)} />}
          </ContainerBox>
        </MedicamentoContainer>

        <MedicamentoContainer width="100%">
          <Linha height="50px">
            <Texto marginLeft="0" fontSize="16px" color={theme.colors.branco}>Visualização do estoque por satélite</Texto>
          </Linha>
          <ContainerBox padding="16px">
            <GraficoBarra totalEstoque={nivelEstoque} />
          </ContainerBox>
        </MedicamentoContainer>
      </Inline>
    </ContainerPage>
  );
};

export default MedicamentoPage;