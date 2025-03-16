import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Alinha os itens à esquerda */
  padding: 2rem;
  background-color: #f5f5f5;
  gap: 1rem;
  min-height: 100vh;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${theme.colors.laranjaPrincipal};
  text-align: center;
  align-self: center; /* Mantém o título centralizado */
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* Move o conteúdo para o lado direito */
  width: 100%;
  margin-top: 2rem;
  padding-right: 5rem; /* Ajuste a posição horizontal */
`;

const ReportCard = styled.div`
  background-color: white;
  padding: 1.0rem;
  border-radius: 12px;
  width: 20%; /* Reduzi o tamanho do card */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-top: 5px solid ${theme.colors.laranjaPrincipal};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ReportHeader = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${theme.colors.laranjaPrincipal};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const BulletPoint = styled.ul`
  padding-left: 1rem;
`;

const BulletItem = styled.li`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #333;
  strong {
    font-weight: bold;
  }
`;

export const Relatorio: React.FC = () => {
  return (
    <PageContainer>
      <Title></Title>
      <ContentContainer>
        <ReportCard>
          <ReportHeader>✨ Com base nos dados analisados nos últimos três meses, observamos algumas tendências:</ReportHeader>
          <BulletPoint>
            <BulletItem><strong>Alta Demanda:</strong> O uso de Paracetamol e Dipirona aumentou em 18%, refletindo um crescimento nos atendimentos de síndromes gripais.</BulletItem>
            <BulletItem><strong>Estoque Crítico:</strong> Medicamentos antibióticos, como Amoxicilina e Azitromicina, estão com níveis reduzidos, exigindo reposição em até 15 dias para evitar desabastecimento.</BulletItem>
            <BulletItem><strong>Redução no Consumo:</strong> Anti-hipertensivos como Losartana tiveram uma queda de 12%, possivelmente devido a mudanças nos protocolos de prescrição.</BulletItem>
            <BulletItem><strong>Picos Sazonais:</strong> O consumo de antialérgicos subiu 25% devido ao aumento de casos relacionados à polinização sazonal e mudanças climáticas.</BulletItem>
          </BulletPoint>
        </ReportCard>
      </ContentContainer>
    </PageContainer>
  );
};

export default Relatorio;
