import { ROUTER_APP_PREFIX } from '../config/app-config';

export default ({
	url = '/',
	data= undefined,
	method = 'GET',
	...rest
}) => fetch(ROUTER_APP_PREFIX+url, {
	...rest,
	body: data && JSON.stringify(data),
	method: method,
	headers: {
		...(rest.headers || {}),
	}
}).then( response => response.json().then(data => ({ data, status: response.status })));