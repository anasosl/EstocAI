import React from "react";
import styled from "styled-components";
import assets from '../../assets';
import { theme } from "../../styles/theme";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.colors.laranjaPrincipal};
  padding: 1.5rem 3rem;
  color: white;
`;

const Logo = styled.img`
  width: 126px;
  height: 40px;
  cursor: pointer;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 3rem;
  display: flex;
  align-items: center;
`;

const NavLink = styled.li`
  cursor: pointer;
  font-size: 1rem;
  font-family: ${theme.fonts.alata};

  &:hover {
    text-decoration: underline;
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const Navbar: React.FC = () => {
  return (
    <NavbarContainer>
      <Logo src = {assets.storangeWhiteLogo}/>
      <NavLinks>
        <NavLink>Pesquisa por Medicamento</NavLink>
        <NavLink>Relatório Inteligente</NavLink>
        <Profile>
          <ProfileImage src={assets.defaultProfile} alt="Perfil" />
          <span>Fabiana</span>
        </Profile>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
