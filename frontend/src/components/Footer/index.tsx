import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

const LinkContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  color: black;
  position: fixed;
  bottom: 0;
  width: 100%;
  margin-bottom: 16px;
`;

const FooterContainer = styled.footer`
  display: flex-row;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 5;
`;

const FooterLine = styled.footer`
  background: linear-gradient(to bottom right, ${theme.colors.laranjaPrincipal},rgb(250, 197, 166));
  padding: 10px;
  width: 100%;
`;

const FooterText = styled.p`
  font-size: 0.9rem;
`;

const FooterLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 1.5rem;
`;

const FooterLink = styled.li`
  cursor: pointer;
  font-size: 0.9rem;
  &:hover {
    text-decoration: underline;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
        <LinkContainer>
        <FooterText>© 2025 StOrange. Todos os direitos reservados.</FooterText>
        <FooterLinks>
            <FooterLink>Política de Privacidade</FooterLink>
            <FooterLink>Termos de Uso</FooterLink>
            <FooterLink>Contato</FooterLink>
        </FooterLinks>
        </LinkContainer>
        <FooterLine />
    </FooterContainer>
  );
};

export default Footer;
