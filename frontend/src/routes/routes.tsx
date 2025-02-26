import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Home } from '../pages';

export const PublicRoutes = (): JSX.Element => (
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<Home />} />
		</Routes>
	</BrowserRouter>
);
