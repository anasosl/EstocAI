import React from 'react';
import { Navbar, Footer, Button, InputAdornments } from '../../components';
import { theme } from '../../styles/theme';

export const Home: React.ElementType = () => {
	const [value, setValue] = React.useState('');
	return (
		<div className='Home'>
			<Navbar />
			<h1>Home {process.env.REACT_APP_VERSION}</h1>
			<Button
				width='100px'
				height='20px'
				borderRadius='4px'
				backgroundColor={theme.colors.azul}
				backgroundColorHover={theme.colors.branco}
				text='Entrar'
				textColor={theme.colors.branco}
				textColorHover={theme.colors.azul}
				borderHover={`1px solid ${theme.colors.azul}`}
			/>
			<InputAdornments
				value={value}
				setValue={setValue}
				type='name'
				textColor={theme.colors.azulEscuro}
				padding='8px'
				border={`1px solid ${theme.colors.azul}`}
				borderFocused={`1px solid ${theme.colors.azulEscuro}`}
				borderHover={`1px solid ${theme.colors.azulClaro}`}
			/>
			<Footer />
		</div>
	);
};
