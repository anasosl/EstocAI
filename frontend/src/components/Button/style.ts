import styled from 'styled-components';
import { ButtonProps } from '../../types/Button/index';

export const ButtonStyle = styled.button<ButtonProps>`
	width: ${(props: ButtonProps) => props.width};
	height: ${(props: ButtonProps) => props.height};
	margin: ${(props: ButtonProps) => props.margin};
	padding: ${(props: ButtonProps) => props.padding};
	background-color: ${(props: ButtonProps) => props.backgroundColor};
	border: ${(props: ButtonProps) => props.border || 0};
	border-radius: ${(props: ButtonProps) => props.borderRadius || 0};
	opacity: ${(props: ButtonProps) => props.opacity};
	align-self: ${(props: ButtonProps) => props.alignself};
	box-shadow: ${(props: ButtonProps) => props.boxShadow};

	p {
		color: ${(props: ButtonProps) => props.textColor};
		text-transform: ${(props: ButtonProps) => props.textTransform};
	}

	.icon {
		visibility: visible;
		display: flex;
		align-items: center;
	}

	.icon-hover {
		visibility: hidden;
		display: none;
	}

	&:hover {
		background: ${(props: ButtonProps) => props.backgroundColorHover};
		border: ${(props: ButtonProps) => props.borderHover || 0};

		p {
			color: ${(props: ButtonProps) => props.textColorHover};
		}

		.icon {
			visibility: hidden;
			display: none;
		}

		.icon-hover {
			visibility: visible;
			display: flex;
			align-items: center;
		}
	}
`;
