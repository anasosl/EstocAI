import React from 'react';
import { ThemeProvider } from 'styled-components';
import { PublicRoutes } from './routes/routes';
import { GlobalStyle } from './styles/global';
import { theme } from './styles/theme';

export const App = (): React.ReactElement => (
	<ThemeProvider theme={theme}>
		<PublicRoutes />
		<GlobalStyle />
	</ThemeProvider>
);
