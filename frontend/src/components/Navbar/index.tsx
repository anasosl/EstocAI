import React, { FC } from 'react';
import { NavbarContainer, Logo, NavLinks, NavLink } from './style'; // Import styled components
import logo from '../../assets/storange-logotipo.png'; // Import the logo image
import { User } from '../User'; // Import the User component

export const Navbar: FC = () => {
	return (
		<NavbarContainer>
			<Logo>
				<a href='/' className='logo'>
					<img src={logo} alt='Storange Logo' style={{ height: '40px' }} />
				</a>
			</Logo>
			<NavLinks>
				<NavLink href='/medicamentos'>Pesquisa por Medicamentos</NavLink>
				<NavLink href='/relatorio'>Relatório Inteligente</NavLink>
			</NavLinks>
			<NavLinks>
				<NavLink href='/' className='user-icon'>
					<i className=''></i>
				</NavLink>
			</NavLinks>
			<User />
		</NavbarContainer>
	);
};
