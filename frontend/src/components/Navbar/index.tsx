import React from "react";
import styled from "styled-components";
import assets from '../../assets';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e87c40;
  padding: 1rem 2rem;
  color: white;
`;

const Logo = styled.img`
  width: 126px;
  height: 40px;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 1.5rem;
`;

const NavLink = styled.li`
  cursor: pointer;
  font-size: 1rem;
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
      </NavLinks>
      <Profile>
        <ProfileImage src={assets.defaultProfile} alt="Perfil" />
        <span>Fabiana</span>
      </Profile>
    </NavbarContainer>
  );
};

export default Navbar;
