import React from 'react';
import { ThemeProvider } from 'styled-components';
import { PublicRoutes } from './routes/routes';
import { GlobalStyle } from './styles/global';
import { theme } from './styles/theme';
import { Footer, Navbar } from './components';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/Auth';

export const App = (): React.ReactElement => (
	<ThemeProvider theme={theme}>
		<BrowserRouter>
			<AuthProvider>
				<Navbar />
				<PublicRoutes />
				<GlobalStyle />
				<Footer />
			</AuthProvider>
		</BrowserRouter>
	</ThemeProvider>
);
