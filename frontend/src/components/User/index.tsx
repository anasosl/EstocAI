import React, { FC } from 'react';
import {
	UserContainer,
	UserImage,
	UserInfo,
	UserName,
	UserRole,
} from './style'; // Import styled components
import assets from '../../assets'; // Import the user image

export const User: FC = () => {
	return (
		<UserContainer>
			<UserImage src={assets.Fabiana} alt='User Image' />
			<UserInfo>
				<UserName>Fabiana</UserName>
				<UserRole>Gerente</UserRole>
			</UserInfo>
		</UserContainer>
	);
};
