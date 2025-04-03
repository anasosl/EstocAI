import React, { FC } from "react";
import { useNavigate } from 'react-router-dom';
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
import { useAuth } from "../../context/Auth";

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


const Navbar: FC = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogin = () => {
    navigate('/Login', { state: { logged: false } });
  }

  const handleLogout = () => {
    logout();
  }

  return (
    <NavbarContainer>
      <Logo src={assets.storangeWhiteLogo} onClick={() => {
        if(sessionStorage.getItem('logged') === 'true') {
          navigate('/home', { state: { logged: true } });
        } else {
          navigate('/Login', { state: { logged: false } });
        }
      }}/>
      <NavLinks>
        {user?.id && sessionStorage.getItem('logged') === 'true' ? (
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
          {user?.id && sessionStorage.getItem('logged') === 'true' ? (
            <>
              <UserImage src={assets.Fabiana} alt='User Image' onClick={handleLogout}/>
              <UserInfo>
                <UserName>{user?.name}</UserName>
                <UserRole>Gerente</UserRole>
              </UserInfo>
            </>
          ) : (
            <LoginButton onClick={handleLogin}>Login</LoginButton>
          )}
        </UserContainer>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
