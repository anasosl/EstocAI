import React, { FC } from 'react';
import {
	UserContainer,
	UserImage,
	UserInfo,
	UserName,
	UserRole,
} from './style'; // Import styled components
import assets from '../../assets'; // Import the user image

interface UserProps {
	userId: String;
}

export const User: FC<UserProps> = ({ userId }) => {
	return (
		<UserContainer>
			{userId ? (
				<>
					<UserImage src={assets.Fabiana} alt='User Image' />
					<UserInfo>
						<UserName>Fabiana</UserName>
						<UserRole>Gerente</UserRole>
					</UserInfo>
				</>
			) : (
				<button>Login</button>
			)}
		</UserContainer>
	);
};
