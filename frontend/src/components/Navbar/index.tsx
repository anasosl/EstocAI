import React, { FC, useEffect } from "react";
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
  TextoMenu,
} from './style';
import { useAuth } from "../../context/Auth";
import { Popover } from "@mui/material";

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
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const { logout, user } = useAuth();

  const handleLogin = () => {
    navigate('/Login', { state: { logged: false } });
  }

  const handleLogout = () => {
    logout();
  }

  const handleClick = (event: any) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };  

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  useEffect(() => {
    handleClose();
  }, [user?.id]);

  return (
    <NavbarContainer>
      <Logo src={assets.storangeWhiteLogo} onClick={() => {
        if(localStorage.getItem('logged') === 'true') {
          navigate('/home', { state: { logged: true } });
        } else {
          navigate('/Login', { state: { logged: false } });
        }
      }}/>
      <NavLinks>
        {user?.id && localStorage.getItem('logged') === 'true' ? (
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
          {user?.id && localStorage.getItem('logged') === 'true' ? (
            <>
              <UserImage src={assets.Fabiana} alt='User Image' onClick={(event) => handleClick(event)}/>
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                style={{ marginTop: 20 }}
              >
                <TextoMenu style={{ padding: '1rem', cursor: "pointer" }} onClick={handleLogout}>Sair</TextoMenu>
              </Popover>
              <UserInfo style={{ cursor: "pointer" }} onClick={(event) => handleClick(event)}>
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
