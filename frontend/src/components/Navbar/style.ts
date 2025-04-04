import styled from 'styled-components';
import { theme } from "../../styles/theme";
// import 'typeface-alata'; // Import the Alata font

export const NavbarContainer = styled.nav`
	font-family: 'Roboto', sans-serif; // Use Roboto font
	width: 100%;
	height: 80px;
	background-color: #fa762d;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); // Updated shadow
`;

// export const Logo = styled.div`
// 	font-size: 24px;
// 	font-weight: bold;
// 	color: #fff;
// `;

export const Logo = styled.img`
  width: 180px;
  height: 100px;
  cursor: pointer;
	align-self: baseline;
`;

export const NavLinks = styled.div`
	display: flex;
	align-items: center;
`;

export const NavLink = styled.a`
	color: #fff;
	text-decoration: none;
	margin: 0 30px;
	font-size: 18px;
	transition: color 0.3s;

	&:hover {
		color: #ddd;
		cursor: pointer;
	}
`;

export const TextoMenu = styled.p`
	color: ${theme.colors.laranjaPrincipal};
	text-decoration: none;
	margin: 0 30px;
	font-size: 18px;
	transition: color 0.3s;

	&:hover {
		color: #ddd;
		cursor: pointer;
	}
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
`;

export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const UserContainer = styled.div`
	display: flex;
	align-items: center;
`;

export const UserImage = styled.img`
	border-radius: 50%;
	width: 40px;
	height: 40px;
	margin-right: 12px;
	cursor: pointer;
`;

export const UserInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: space-between;
`;

export const UserName = styled.span`
	font-weight: bold;
	display: flex;
	justify-content: bottom;
	font-size: 14px;
	color: white;
`;

export const UserRole = styled.span`
	margin-top: 2px;
	font-size: 14px;
	color: white;
`;

export const LoginButton = styled.button`
  background: transparent;
  border: 2px solid white;
  border-radius: 10px;
  color: white;
  padding: 1rem 2rem;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    background: white;
    color: ${theme.colors.laranjaPrincipal};
  }
`;