import React, { FC } from 'react';
import {
	UserContainer,
	UserImage,
	UserInfo,
	UserName,
	UserRole,
} from './style'; // Import styled components
import userImage from '../../assets/Fabiana.png'; // Import the user image

export const User: FC = () => {
	return (
		<UserContainer>
			<UserImage src={userImage} alt='User Image' />
			<UserInfo>
				<UserName>Fabiana</UserName>
				<UserRole>Gerente</UserRole>
			</UserInfo>
		</UserContainer>
	);
};
