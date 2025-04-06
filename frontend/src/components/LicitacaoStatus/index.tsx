import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface LicitacaoStatusProps {
  licitacoes: Array<[string, string, string, string]>;
}

interface ProgressProps {
  percentage: number;
}

const ProgressBarContainer = styled.div`
  background-color: #ddd;
  border-radius: 15px;
  overflow: hidden;
  height: 16px;
  margin: 8px 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  position: relative;
  width: 100%;
`;

const Progress = styled.div<ProgressProps>`
  background-color:${theme.colors.verde};
  height: 100%;
  transition: width 0.3s ease-in-out;
  position: relative;

  &::after {
    content: '${props => props.percentage}%';
    color: white;
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
    font-weight: bold;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
`;

const LicitacaoStatusContainer = styled.div`
  width: 100%;
  max-height: 35vh;
  padding: 0.5rem;
  background-color: ${theme.colors.branco};
  border-radius: 16px;
  margin-left: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;

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
`;

const LicitacaoItem = styled.div`
  margin: 15px 0;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

const Nome = styled.span`
  font-weight: 600;
  font-size: 1rem;
  color: ${theme.colors.preto};
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const InfoContainer = styled.div`
  display: flex;
  gap: 16px;
  color: ${theme.colors.cinzaEscuro};
  font-size: 0.875rem;
`;

const Separator = styled.hr`
  border: 0;
  border-top: 2px solid ${theme.colors.verde};
  margin: 8px 0;
`;

export const LicitacaoStatus: React.FC<LicitacaoStatusProps> = ({ licitacoes }) => {
  return (
    <LicitacaoStatusContainer>
      {licitacoes.map(([nome, data, quantidade, porcentagem], index) => {
        const progresso = parseFloat(porcentagem) * 100;
        
        return (
          <React.Fragment key={index}>
            <LicitacaoItem>
              <HeaderContainer>
                <Nome title={nome}>{nome}</Nome>
                <InfoContainer>
                  <span title={data}>{data}</span>
                  <span title={quantidade}>{quantidade}</span>
                </InfoContainer>
              </HeaderContainer>

              <ProgressBarContainer>
                <Progress 
                  percentage={Math.round(progresso)}
                  style={{ width: `${progresso}%` }}
                />
              </ProgressBarContainer>
            </LicitacaoItem>

            {index < licitacoes.length - 1 && <Separator />}
          </React.Fragment>
        );
      })}
    </LicitacaoStatusContainer>
  );
};

export default LicitacaoStatus;