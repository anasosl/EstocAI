import styled from 'styled-components';

export const UserContainer = styled.div`
	display: flex;
	align-items: center;
`;

export const UserImage = styled.img`
	border-radius: 50%;
	width: 40px;
	height: 40px;
	margin-right: 12px;
`;

export const UserInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: space-between;
`;

export const UserName = styled.span`
	font-weight: bold;
	display: flex;
	justify-content: bottom;
	font-size: 14px;
	color: white;
`;

export const UserRole = styled.span`
	margin-top: 2px;
	font-size: 14px;
	color: white;
`;
