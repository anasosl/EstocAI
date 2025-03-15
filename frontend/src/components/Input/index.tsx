import { useState, useEffect, FC } from 'react';
import { FormHelperText, FormControl } from '@mui/material';
import { InputStyle } from './style';
import {
	regexPhone,
	regexEmail,
	regexName,
	regexBirthData,
	regexCPF,
} from '../../utils/Regex/regex';
import { InputProps } from '../../types/Input';

export const InputAdornments: FC<InputProps> = props => {
	const [error, setError] = useState<boolean>(!!props.errorMessage);
	const [errorText, setErrorText] = useState<string | null>(
		props.errorMessage || null
	);

	const regExpTypes = [
		{ type: 'name', regExp: regexName },
		{ type: 'phone', regExp: regexPhone },
		{ type: 'email', regExp: regexEmail },
		{ type: 'cpf', regExp: regexCPF },
		{ type: 'birthDate', regExp: regexBirthData },
	];

	const checkCharacters = (
		event: React.ChangeEvent<HTMLInputElement>
	): boolean => {
		const regExpType = regExpTypes.find(item => item.type === props.type);
		const match = regExpType?.regExp.test(event.target.value);

		switch (props.type) {
			case 'name':
				setErrorText(!match ? 'Digite seu nome' : null);
				break;

			case 'password':
				setErrorText(!match ? 'Digite sua senha' : null);
				break;

			case 'phone':
				setErrorText(!match ? 'Digite um telefone válido' : null);
				break;

			case 'email':
				setErrorText(!match ? 'Digite um email válido' : null);
				break;

			case 'cpf':
				setErrorText(!match ? 'Digite um CPF válido' : null);
				break;

			case 'birthDate':
				setErrorText(!match ? 'Digite uma data de nascimento válida' : null);
				break;

			default:
				break;
		}
		setError(!match);

		return match || false;
	};

	useEffect(() => {
		if (errorText) {
			setError(true);
			setErrorText(errorText);
		}
	}, [errorText]);

	return (
		<FormControl sx={{ width: '100%' }} variant='outlined'>
			<InputStyle
				id={props.id}
				title={props.textSpan || props.placeholder}
				tabIndex={props.tabIndex}
				width={props.width}
				placeholder={props.placeholder}
				value={props.value}
				disabled={props.disabled}
				autoFocus={props.autoFocus}
				padding={props.padding}
				backgroundColor={props.backgroundColor}
				textColor={props.textColor}
				border={props.border}
				borderFocused={props.borderFocused}
				borderHover={props.borderHover}
				borderRadius={props.borderRadius}
				onKeyDown={event => {
					if (event.key === 'Enter') {
						return props.onClick;
					}
				}}
				onBlur={() => {
					if (props.value) {
						props.setValue(props.value?.trim());
					}
				}}
				type={props.type}
				error={props.errorMessage ? error : false}
				inputProps={{
					'aria-label': props.placeholder,
				}}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					checkCharacters(event);
					props.setValue(event.target.value);
				}}
				onClick={props.onClick}
				startAdornment={props.iconStart}
				endAdornment={props.iconEnd}
			/>
			<FormHelperText error>{props.errorMessage || errorText}</FormHelperText>
		</FormControl>
	);
};
