import styled from 'styled-components';
import '@fontsource/alata'; // Import Alata font

export const NavbarContainer = styled.nav`
	font-family: 'Alata', sans-serif; // Use Alata font
	width: 100%;
	height: 80px;
	background-color: #fa762d;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); // Updated shadow
`;

export const Logo = styled.div`
	font-size: 24px;
	font-weight: bold;
	color: #fff;
`;

export const NavLinks = styled.div`
	display: flex;
	align-items: center;
`;

export const NavLink = styled.a`
	color: #fff;
	text-decoration: none;
	margin: 0 15px;
	font-size: 18px;
	transition: color 0.3s;

	&:hover {
		color: #ddd;
	}
`;
