import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Home } from '../pages';
import { Relatorio } from '../pages/Relatorio';
import MedicamentoPage from '../pages/Medicamento';

export const PublicRoutes = (): JSX.Element => (
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/home' element={<Home />} />
			<Route path='/relatorio' element={<Relatorio />} />
			<Route path='/medicamento/:id' element={<MedicamentoPage />} />
		</Routes>
	</BrowserRouter>
);
