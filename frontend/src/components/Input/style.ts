import styled from 'styled-components';
import { OutlinedInput } from '@mui/material';
import { InputStyleProps } from '../../types/Input';

export const InputStyle = styled(OutlinedInput)<InputStyleProps>`
	width: ${({ width }) => width};
	height: ${({ height }) => height};
	box-shadow: ${({ boxShadow }) => boxShadow};
	border-radius: ${({ borderRadius }) => borderRadius};
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
		border: ${({ borderFocused }) => `${borderFocused} !important`};
	}
`;
