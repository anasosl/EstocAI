import React from 'react';
import { ThemeProvider } from 'styled-components';
import { PublicRoutes } from './routes/routes';
import { GlobalStyle } from './styles/global';
import { theme } from './styles/theme';
import { Footer, Navbar } from './components';
import { BrowserRouter } from 'react-router-dom';

export const App = (): React.ReactElement => (
	<ThemeProvider theme={theme}>
		<BrowserRouter>
			<Navbar />
			<PublicRoutes />
			<GlobalStyle />
			<Footer />
		</BrowserRouter>
	</ThemeProvider>
);
