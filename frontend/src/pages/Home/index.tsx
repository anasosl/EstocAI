import React from "react";
import styled from "styled-components";
import { NotificationCenter } from "../../components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const SearchBarContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  padding: 0.8rem;
  width: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const SearchButton = styled.button`
  background-color: #e87c40;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #d96530;
  }
`;

const InsightsContainer = styled.div`
  width: 30%;
  text-align: center;
`;

const InsightsText = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const InsightsButton = styled.button`
  background-color: #e87c40;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
`;

const InsightsImage = styled.img`
  width: 100%;
  margin-top: 1rem;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Home: React.FC = () => {
  return (
    <PageContainer>
      <Title>Veja as tendências de estoque para um medicamento</Title>
      <SearchBarContainer>
        <SearchInput placeholder="Procure por um medicamento" />
        <SearchButton>Buscar 🔍</SearchButton>
      </SearchBarContainer>

      <MainContent>

	  <NotificationCenter />

        <InsightsContainer>
          <InsightsText>Obtenha insights com os relatórios inteligentes</InsightsText>
          <InsightsButton>Ver relatório</InsightsButton>
          <InsightsImage src="https://via.placeholder.com/200" alt="Insights" />
        </InsightsContainer>
      </MainContent>
    </PageContainer>
  );
};

export default Home;
