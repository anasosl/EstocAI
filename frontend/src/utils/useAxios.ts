/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-empty-function */
import cookie from 'cookie';
import { useCallback } from 'react';
import api from '../services/api';

export interface HttpParams {
	url: string;
	body?: object;
	setState?: Function;
	process?: Function;
	success?: Function;
	error?: Function;
	config?: object;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function useAxios(...methods: ('get' | 'post' | 'put' | 'delete' | 'patch')[]) {
	if (methods.length === 0)
		throw new TypeError(
			'Methods array is empty, add a method to `useAxios` parameters'
		);

	const functions = methods.map(method => {
		if (!['get', 'post', 'put', 'delete', 'patch'].includes(method)) {
			throw new TypeError(`Invalid method (${method})`);
		}

		const httpRequest = async ({
			url: relativeUrl = '/',
			body = {},
			setState = () => {},
			process = (data: any) => data,
			success = () => {},
			error = () => {},
			config = {},
		}: HttpParams) => {
			try {
				const { headers } = getOptions();

				const methodsArguments = {
					get: [{ headers, ...config }],
					post: [body, { headers, ...config }],
					put: [body, { headers, ...config }],
					patch: [body, { headers, ...config }],
					delete: [{ headers, data: body, ...config }],
				};

				const res = await api[method](relativeUrl, ...methodsArguments[method]);

				if (method === 'get') {
					if (setState) {
						setState(await process(res.data.data));
					} else {
						process(res.data.data);
					}
				}

				await success(res, body);
				return res;
			} catch (err) {
				console.log(err);
				await error(err);

				return err;
			}
		};

		return httpRequest;
	});

	const first = useCallback(functions[0], []);
	const second = useCallback(functions[1], []);
	const third = useCallback(functions[2], []);
	const fourth = useCallback(functions[3], []);
	const fifth = useCallback(functions[4], []);

	return [
		...(first ? [first] : []),
		...(second ? [second] : []),
		...(third ? [third] : []),
		...(fourth ? [fourth] : []),
		...(fifth ? [fifth] : []),
	];
}

const getOptions = () => {
	const cookies = cookie.parse(document.cookie);
	const { token } = cookies;
	const headers = {
		authorization: token,
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Credentials': 'true',
		'Access-Control-Allow-Methods':
			'POST, GET, PATCH, DELETE, PUT, OPTIONS, HEAD, TRACE, CONNECT',
		'Access-Control-Allow-Headers':
			'Origin, X-Requested-With, Content-Type, Accept',
	};
	return {
		headers,
	};
};

export default useAxios;
