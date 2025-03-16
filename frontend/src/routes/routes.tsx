import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Home } from '../pages';
import { Relatorio } from '../pages/Relatorio';

export const PublicRoutes = (): JSX.Element => (
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/relatorio' element={<Relatorio />} />
		</Routes>
	</BrowserRouter>
);
