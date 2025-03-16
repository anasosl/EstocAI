import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import IconAlerta from '../../assets/IconAlerta.svg';
import Notificacoes from '../../mocks/Notificacoes.json';
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "../../assets/SearchIcon.svg";

const NotificationsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root {
    border-radius: 28px;
  }
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const FilterButton = styled.button<{ active?: boolean }>`
  background-color: ${(props) => (props.active ? "#333" : "#eee")};
  color: ${(props) => (props.active ? "white" : "#333")};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #bbb;
  }
`;

const NotificationCard = styled.div`
  background-color: white;
  border-radius: 10px;
  border: 1px solid #ddd;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border: 1px solid #A1A1A1;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
`;

const NotificationHeader = styled.div`
  background-color: ${(props) => props.color || theme.colors.vermelho};
  color: white;
  padding: 0.5rem;
  border-radius: 5px 0 5px 0;
  font-weight: bold;
  width: fit-content;
  display: flex;
  gap: 0.5rem;
`;

const NotificationBody = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NotificationText = styled.p`
  font-size: 1rem;
  color: ${(props) => props.color};
`;

const ViewButton = styled.button`
  display: inline-block; // Garante que ele receba eventos corretamente
  align-self: flex-end;
  background-color: ${({ theme }) => theme.colors.branco};
  border: 1px solid ${({ theme }) => theme.colors.laranjaPrincipal};
  color: ${({ theme }) => theme.colors.laranjaPrincipal};
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.laranjaPrincipal};
    color: ${({ theme }) => theme.colors.branco};
  }
`;

const NotificacoesContainer = styled.div`
  width: 100%;
  height: 50vh;
  padding: 0 5rem;
  overflow: auto;


`;

const TextBold = styled.h3`
  font-weight: bold;
  font-size: 24px;
  align-self: center;
`;

const NotificationCenter: React.FC = () => {
  const [active, setActive] = useState("todas");

  const handleClick = (key: string) => setActive(key);

  const filterNotifications = () => {
    if (active === "todas"){
      return Notificacoes.filter(e => e.tipo)
    } else if (active === "crítico"){
      return Notificacoes.filter(e => e.tipo === "ESTOQUE CRÍTICO")
    } else if (active === "atenção"){
      return Notificacoes.filter(e => e.tipo === "ATENÇÃO")
    } else if (active === "cuidado"){
      return Notificacoes.filter(e => e.tipo === "CUIDADO")
    } return Notificacoes
  };

  const colorTipo = (tipo: any) => {
    if (tipo === "ESTOQUE CRÍTICO") {
      return theme.colors.vermelho
    } else if (tipo === "ATENÇÃO") {
      return theme.colors.preto423C2C
    } else if (tipo === "CUIDADO") {
      return theme.colors.azul
    }
  }

  return( 
    <NotificationsContainer>
      <FilterButtons>
        <TextBold>Notificações</TextBold>
        {["todas", "crítico", "atenção", "cuidado"].map((key) => (
      <FilterButton 
        key={key} 
        active={active === key} 
        onClick={() => handleClick(key)}
      >
        {key.charAt(0).toUpperCase() + key.slice(1)}
      </FilterButton>
    ))}
      </FilterButtons>

      <TextField
        placeholder="Busque nas notificações"
        variant="outlined"
        sx={{ width: '80%', borderRadius: 16, backgroundColor: theme.colors.branco }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <img src={SearchIcon} alt="Pesquisar" />
            </InputAdornment>
          ),
        }}
      />

      <NotificacoesContainer>
        {filterNotifications().map((item, index) => (
          <NotificationCard key={Number(index)}>
          <NotificationHeader color={colorTipo(item.tipo)}>
            <img src={IconAlerta} alt="Alerta" />
            <NotificationText>{item.tipo}</NotificationText>
          </NotificationHeader>

          <NotificationBody>
            <NotificationText color={theme.colors.preto}>
              {item.titulo}
            </NotificationText>
            <NotificationText color={theme.colors.cinzaEscuro}>{item.descricao}</NotificationText>
            <ViewButton onClick={() => window.location.replace(`/medicamento/${item.id}`)}>Visualizar</ViewButton>
          </NotificationBody>
        </NotificationCard>))}
      </NotificacoesContainer>
    </NotificationsContainer>
  );
};

export default NotificationCenter;