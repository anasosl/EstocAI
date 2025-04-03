import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Cadastro, Home, Login } from '../pages';
import { Relatorio } from '../pages/Relatorio';
import MedicamentoPage from '../pages/Medicamento';

export const PublicRoutes = (): JSX.Element => (
	<div className='container'>
		<Routes>
			<Route path='/' element={<Login />} />
			<Route path='/Login' element={<Login />} />
			<Route path='/cadastro' element={<Cadastro />} />
			<Route path='/home' element={<Home />} />
			<Route path='/relatorio' element={<Relatorio />} />
			<Route path='/medicamento/:id' element={<MedicamentoPage />} />
		</Routes>
	</div>
);
