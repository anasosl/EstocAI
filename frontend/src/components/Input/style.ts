import styled from 'styled-components';
import { OutlinedInput } from '@mui/material';
import { InputStyleProps } from '../../types/Input';
import { theme } from '../../styles/theme';

export const InputStyle = styled(OutlinedInput)<InputStyleProps>`
	width: ${({ width }) => width};
	height: ${({ height }) => height};
	box-shadow: ${({ boxShadow }) => boxShadow};
	border-radius: ${({ borderRadius }) => borderRadius || '12px !important'};
	background-color: ${({ backgroundColor }) => backgroundColor};

	.MuiOutlinedInput-input {
		color: ${({ textColor }) => textColor};
		padding: ${({ padding }) => padding};
	}

	.MuiOutlinedInput-notchedOutline {
		border: ${({ border }) => border};
	}

	&:hover .MuiOutlinedInput-notchedOutline {
		border: ${({ borderHover }) => `${borderHover} !important`};
	}

	&.Mui-focused .MuiOutlinedInput-notchedOutline {
		border: 2px solid ${theme.colors.laranjaPrincipal} !important;
	}
`;
