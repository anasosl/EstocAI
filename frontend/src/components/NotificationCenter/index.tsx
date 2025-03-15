import React from "react";
import styled from "styled-components";

const NotificationsContainer = styled.div`
  width: 60%;
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
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid #ddd;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NotificationHeader = styled.div`
  background-color: #c74c3c;
  color: white;
  padding: 0.5rem;
  border-radius: 5px;
  font-weight: bold;
  width: fit-content;
`;

const NotificationText = styled.p`
  font-size: 1rem;
`;

const ViewButton = styled.button`
  align-self: flex-end;
  background-color: #ff9f68;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
`;

const NotificationCenter: React.FC = () => {
    return( 
      <NotificationsContainer>
        <FilterButtons>
          <FilterButton active={true}>Todas</FilterButton>
          <FilterButton>Crítico</FilterButton>
          <FilterButton>Atenção</FilterButton>
          <FilterButton>Cuidado</FilterButton>
        </FilterButtons>

        <NotificationCard>
          <NotificationHeader>ESTOQUE CRÍTICO</NotificationHeader>
          <NotificationText>
            Estoque de <strong>Amoxicilina</strong> crítico: 17 dias até fim do estoque.
          </NotificationText>
          <NotificationText>É necessária uma ação urgente.</NotificationText>
          <ViewButton>Visualizar</ViewButton>
        </NotificationCard>

        <NotificationCard>
          <NotificationHeader>ESTOQUE CRÍTICO</NotificationHeader>
          <NotificationText>
            Estoque de <strong>Amoxicilina</strong> crítico: 17 dias até fim do estoque.
          </NotificationText>
          <NotificationText>É necessária uma ação urgente.</NotificationText>
          <ViewButton>Visualizar</ViewButton>
        </NotificationCard>

        <NotificationCard>
          <NotificationHeader>ESTOQUE CRÍTICO</NotificationHeader>
          <NotificationText>
            Estoque de <strong>Amoxicilina</strong> crítico: 17 dias até fim do estoque.
          </NotificationText>
          <NotificationText>É necessária uma ação urgente.</NotificationText>
          <ViewButton>Visualizar</ViewButton>
        </NotificationCard>
    </NotificationsContainer>
  );
};

export default NotificationCenter;