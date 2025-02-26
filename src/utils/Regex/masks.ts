/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const phoneMask = (value: string): string =>
	value
		.replace(/\D+/g, '')
		.replace(/(\d{2})(\d)/, '($1) $2')
		.replace(/(\d{4})(\d)/, '$1-$2')
		.replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
		.replace(/(-\d{4})\d+?$/, '$1');

export const cpfMask = (value: string): string =>
	value
		.replace(/\D/g, '')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d{1,2})/, '$1-$2')
		.replace(/(-\d{2})\d+?$/, '$1');

export const birthDateMask = (value: string): string =>
	value
		.replace(/\D/g, '')
		.replace(/(\d{2})(\d)/, '$1/$2')
		.replace(/(\d{2})(\d)/, '$1/$2')
		.slice(0, 10);

export const emailMask = (value: string): string =>
	value.replace(/\s/g, '').slice(0, 100);

export const caracterCustomizado = (value: string, max: number): string =>
	value.slice(0, max);

export const numeroCustomizadoMask = (value: string, max: number): string =>
	value.replace(/\D/g, '').slice(0, max);

export const cepMask = (value: string): string =>
	value
		.replace(/\D/g, '')
		.replace(/(\d{5})(\d)/, '$1-$2')
		.replace(/(-\d{3})\d+?$/, '$1');
