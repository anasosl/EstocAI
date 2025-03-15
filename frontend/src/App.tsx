import React from 'react';
import { ThemeProvider } from 'styled-components';
import { PublicRoutes } from './routes/routes';
import { GlobalStyle } from './styles/global';
import { theme } from './styles/theme';
import { Footer, Navbar } from './components';

export const App = (): React.ReactElement => (
	<ThemeProvider theme={theme}>
		<Navbar />
		<PublicRoutes />
		<GlobalStyle />
		<Footer />
	</ThemeProvider>
);
