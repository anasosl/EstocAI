import React, { FC } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import assets from '../../assets';
import {
  NavbarContainer, 
  Logo, 
  NavLinks, 
  NavLink, 
  UserContainer,
	UserImage,
	UserInfo,
	UserName,
	UserRole,
  LoginButton,
} from './style';

// const NavbarContainer = styled.nav`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   background-color: ${theme.colors.laranjaPrincipal};
//   padding: 1.5rem 3rem;
//   color: white;
// `;

// const Logo = styled.img`
//   width: 126px;
//   height: 40px;
//   cursor: pointer;
// `;

// const NavLinks = styled.ul`
//   display: flex;
//   list-style: none;
//   gap: 3rem;
//   display: flex;
//   align-items: center;
// `;

// const NavLink = styled.li`
//   cursor: pointer;
//   font-size: 1rem;
//   font-family: ${theme.fonts.alata};

//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const Profile = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   font-size: 1rem;
// `;

// const ProfileImage = styled.img`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
// `;

interface UserProps {
	userId?: String;
}

const Navbar: FC<UserProps> = ({ userId = 'fabiana' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    navigate('/Login', { state: { logged: false } });
  }
  return (
    <NavbarContainer>
      <Logo src = {assets.storangeWhiteLogo} onClick={() => window.location.replace('/home')}/>
      <NavLinks>
        {userId && (!location.state || location.state.logged) ? (
          <>
            <NavLink>Pesquisa por Medicamento</NavLink>
            <NavLink onClick={() => window.location.replace('/relatorio')}>Relatório Inteligente</NavLink>
          </>
        ) : (
            <>
              <NavLink>Sobre</NavLink>
              <NavLink>Ajuda</NavLink>
            </>
        )}
        {/* <Profile>
          <ProfileImage src={assets.defaultProfile} alt="Perfil" />
          <span>Fabiana</span>
        </Profile> */}
        <UserContainer>
          {userId && (!location.state || location.state.logged) ? (
            <>
              <UserImage src={assets.Fabiana} alt='User Image' onClick={handleLogin}/>
              <UserInfo>
                <UserName>Fabiana</UserName>
                <UserRole>Gerente</UserRole>
              </UserInfo>
            </>
          ) : (
            <LoginButton onClick={handleLogin} >Login</LoginButton>
          )}
        </UserContainer>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
