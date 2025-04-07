import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { saveAs } from "file-saver";
import IconEditar from "../../assets/IconEditar.svg";
import IconSalvar from "../../assets/IconSalvar.svg";
import axios from "axios";
import Estrelas from "../../assets/Estrelas.svg";
import { Inline } from "../Login/style";

type Props = {
  $borderRadius?: string;
};

// ================== Styled Components ==================
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  //align-items: center;
  padding: 2rem;
  background-color: #f5f5f5;
  gap: 2rem;
  min-height: 100vh;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: ${theme.colors.preto};
  text-align: start;
  margin: 0;
  margin-left: 42px;
`;

/**
 * Agrupa o card e a tabela na horizontal
 */
const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 2rem;
  align-items: flex-start;
  margin: 0 auto;

  @media screen and (max-width: 1024px) {
    width: 100%;
    flex-direction: column;
  }
`;

/** Card lateral com as tendências recentes (bullet points) */
const ReportCard = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 12px;
  width: 28%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-top: 20px solid ${theme.colors.laranjaPrincipal};
  display: flex;
  flex-direction: column;
   max-height: 65vh;
  gap: 1rem;

  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.colors.cinza};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.cinzaEscuro};
    border-radius: 4px;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

const ReportHeader = styled.div`
  color: ${theme.colors.laranjaPrincipal};
  font-weight: bold;
  font-size: 1.2rem;
  line-height: 1.4;
`;

const BulletList = styled.ul`
  list-style-type: disc;
  padding-left: 1.5rem;
`;

const BulletItem = styled.li`
  margin-bottom: 0.8rem;
  font-size: 1rem;
  line-height: 1.4;
  color: #333;

  strong {
    font-weight: bold;
    color: #000;
  }
`;

/** Container da tabela grande de medicamentos */
const TableContainer = styled.div`
  width: 65%;
  //background: white;
  border-radius: 12px;
  //box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  background-color: ${theme.colors.branco};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
`;

const Th = styled.th<Props>`
  background-color: ${theme.colors.laranjaPrincipal};
  color: white;
  padding: 10px;
  border-radius: ${({ $borderRadius }) => $borderRadius};
  font-size: 0.95rem;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  color: #555;
  font-size: 0.95rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 1rem;
`;

/** Botão genérico com ícone */
const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: ${theme.colors.laranjaPrincipal};

  &:hover {
    color: darkorange;
  }
`;

const PurchaseButton = styled.button`
  background-color: ${theme.colors.laranjaPrincipal};
  color: white;
  font-weight: bold;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.branco};
    color: ${({ theme }) => theme.colors.laranjaPrincipal};
    border: 1px solid ${({ theme }) => theme.colors.laranjaPrincipal};
  }
`;

// ================== Componente Principal ===================
export const Relatorio: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [ata, setAta] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [report, setReport] = useState<string>("");
  const [columnKeys, setColumnKeys] = useState<string[]>([]);

  // Exporta a tabela para CSV usando file-saver
  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Medicamento,Fornecedor,Quantidade"]
        .concat(
          data.map(
            (row) => `${row.medicamento},${row.fornecedor},${row.quantidade}`
          )
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    saveAs(encodedUri, "relatorio_medicamentos.csv");
  };

  // Edita a quantidade de um item da tabela via prompt
  const handleEdit = (index: number) => {
    const newData = [...data];
    const newValue = prompt(
      "Digite a nova quantidade:",
      newData[index].quantidade.toString()
    );
    if (newValue !== null) {
      newData[index].quantidade = parseInt(newValue);
      setData(newData);
    }
  };

  const fetchData = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_API}/model/prediction`)
        .then((response) => {
          const data = response.data.data.result;
          console.log("Dados recebidos:", data);
          setTableData(data);
        })
        .catch((error) => {
          console.error("Erro ao buscar os dados:", error);
        });
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchReport = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/model/report`);
      const reportText = response.data.data.result;
      setReport(reportText as string);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  useEffect(() => {
    let medicamentosData: any[] = [];

    fetch('/mocks/csv/medicamentos.csv')
      .then((res) => res.text())
      .then((text) => {
        medicamentosData = csvToJson(text);
        console.log('Medicamentos:', medicamentosData);
        return fetch('/mocks/csv/atas_registro_precos.csv');
      })
      .then((res) => res.text())
      .then((text) => {
        const ataData = csvToJson(text);

        const ataComMedicamentos = ataData.map((ataItem: any) => {
          const medicamento = medicamentosData.find(
            (med) => med.id_medicamento === ataItem.id_medicamento
          );
          return {
            ...ataItem,
            ...medicamento,
          };
        });

        setAta(ataComMedicamentos);
        console.log('Ata com dados do medicamento:', ataComMedicamentos);
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

  return (
    <PageContainer>
      <Title>Sugestão de Compra</Title>

      <ContentWrapper>
        {/** Tabela principal de medicamentos */}
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <Th $borderRadius="6px 0 0 0">Nome</Th>
                <Th>Taxa média de consumo</Th>
                <Th>Custo do Lote</Th>
                <Th>Consumo médio último mês</Th>
                <Th>Data ótima para compra</Th>
                <Th>Quantidade a pedir</Th>
                <Th>Total Consumido</Th>
                <Th>Aquisição</Th>
                <Th>Tipo</Th>
                <Th $borderRadius="0 6px 0 0">Ações</Th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(tableData) && tableData.map((item, index) => (
                console.log(item),
                <tr key={index}>
                  <Td>{item.nome_medicamento}</Td>
                  <Td>{item.avg_consumption_rate !== null ? item.avg_consumption_rate.toFixed(1): '-'}</Td>
                  <Td>{item.cost_of_lot !== null ? item.cost_of_lot.toFixed(1): '-'}</Td>
                  <Td>{item.last_month_avg_consumption !== null ? item.last_month_avg_consumption.toFixed(1): '-'}</Td>
                  <Td>{item.optimal_order_date}</Td>
                  <Td>{item.order_quantity !== null ? item.order_quantity.toFixed(0): '-'}</Td>
                  <Td>{item.percentage_consumed !== null ? item.percentage_consumed .toFixed(2): '-'}</Td>
                  <Td>{item.procurement_mode}</Td>
                  <Td>{item.tipo}</Td>
                  <Td>
                    <IconButton onClick={() => handleEdit(index)}>
                      <img src={IconEditar} alt="Icone de editar" />
                    </IconButton>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>

          <ButtonContainer>
            <IconButton onClick={handleExportCSV}>
              <img src={IconSalvar} alt="Icone de editar" />
            </IconButton>
            <PurchaseButton>
              Gerar Compra
            </PurchaseButton>
          </ButtonContainer>
        </TableContainer>

        {/** Card lateral de tendências recentes (bullet points) */}
        <ReportCard>
          
          <ReportHeader>
            <Inline>
              <img src={Estrelas} alt="Pesquisar" width={80} />
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
        </ReportCard>
      </ContentWrapper>
    </PageContainer>
  );
};

export default Relatorio;
