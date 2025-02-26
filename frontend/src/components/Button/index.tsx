import React, { FC } from 'react';
import { ButtonStyle } from './style';
import { ButtonProps } from '../../types/Button/index';

export const Button: FC<ButtonProps> = props => {
	return (
		<ButtonStyle
			id={props.id}
			width={props.width}
			height={props.height}
			margin={props.margin}
			padding={props.padding}
			alignself={props.alignself}
			whiteSpace={props.whiteSpace}
			backgroundColor={props.backgroundColor}
			border={props.border}
			borderRadius={props.borderRadius}
			boxShadow={props.boxShadow}
			textColor={props.textColor}
			textTransform={props.textTransform}
			fontSize={props.fontSize}
			textColorHover={props.textColorHover}
			backgroundColorHover={props.backgroundColorHover}
			borderHover={props.borderHover}
			onClick={props.onClick}
			onKeyDown={event => {
				if (event.key === 'Enter') {
					return props.onClick;
				}
			}}>
			<div className='icon'>{props.iconLeft}</div>
			<div className='icon-hover'>{props.iconLeftHover}</div>
			<p>{props.text}</p>
			<div className='icon'>{props.iconRight}</div>
			<div className='icon-hover'>{props.iconRightHover}</div>
		</ButtonStyle>
	);
};
