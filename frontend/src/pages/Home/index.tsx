import React from "react";
import styled from "styled-components";
import { NotificationCenter } from "../../components";
import assets from '../../assets';
import { TextField, InputAdornment } from "@mui/material";
import ButtonBuscar from "../../assets/ButtonBuscar.svg";
import { theme } from "../../styles/theme";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f5f5f5;
  gap: 1rem;

  .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root {
    border-radius: 18px;
  }
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
`;

const InsightsContainer = styled.div`
  width: 30%;
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
`;

const InsightsText = styled.h3`
  font-size: 24px;
  color: ${theme.colors.preto};
`;

const InsightsButton = styled.button`
  background-color: ${theme.colors.laranjaPrincipal};
  color: white;
  font-weight: bold;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-size: 1rem;
  width: 150px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.branco};
    color: ${({ theme }) => theme.colors.laranjaPrincipal};
    border: 1px solid ${({ theme }) => theme.colors.laranjaPrincipal};
  }
`;

const InsightsImage = styled.img`
  width: 100%;
  margin-top: 1rem;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 2rem;

  @media screen and (max-width: 768px) {
   display: flex;
    flex-direction: column;
  }
`;

const Column = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
   width: 100%;
  }
`;

export const Home: React.FC = () => {
  return (
    <PageContainer>
      <Title>Veja as tendências de estoque para um medicamento</Title>
      <TextField
        placeholder="Busque nas notificações"
        variant="outlined"
        sx={{ width: '80%', borderRadius: 4, backgroundColor: theme.colors.branco }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <img src={ButtonBuscar} alt="Pesquisar" style={{ cursor: "pointer" }}/>
            </InputAdornment>
          ),
        }}
      />

      <MainContent>
        <Column>
          <NotificationCenter />
        </Column>

        <Column>
          <InsightsContainer>
            <InsightsText>Obtenha insights com os relatórios inteligentes</InsightsText>
            <InsightsButton onClick={() => window.location.replace('/relatorio')}>Ver relatório</InsightsButton>
            <InsightsImage src={assets.Remedios} alt="Remédios" />
          </InsightsContainer>
        </Column>
      </MainContent>
    </PageContainer>
  );
};

export default Home;
