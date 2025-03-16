import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages';
import { Login } from '../pages/Login';

export const PublicRoutes = (): JSX.Element => (
	<div className='container'>
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/Login' element={<Login />} />
		</Routes>
	</div>
);
