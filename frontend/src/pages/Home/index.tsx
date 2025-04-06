import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NotificationCenter } from "../../components";
import assets from '../../assets';
import { TextField, InputAdornment, Autocomplete } from "@mui/material";
import ButtonBuscar from "../../assets/ButtonBuscar.svg";
import { theme } from "../../styles/theme";
import axios from "axios";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API}/medicine`, {
            params: { search: searchTerm },
          });
          console.log("Resposta:", response);
          const data = response.data.data;
          setSuggestions(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error("Erro ao buscar sugestões:", error);
          setSuggestions([]);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  return (
    <PageContainer>
      <Title>Veja as tendências de estoque para um medicamento</Title>
      <Autocomplete
        freeSolo
        popupIcon={null}
        options={suggestions}
        getOptionLabel={(option) => option.name || ""}
        inputValue={searchTerm}
        sx={{ width: "80%"}}
        onInputChange={(event, newInputValue) => setSearchTerm(newInputValue)}
        onChange={(event, value) => {
          if (value && value.name) {
            window.location.href = `/medicamento/${value.id}`;
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            placeholder="Procure por um medicamento"
            variant="outlined"
            sx={{ width: "100%", borderRadius: 4, backgroundColor: theme.colors.branco }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <img
                    src={ButtonBuscar}
                    alt="Pesquisar"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
        )}
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
