import Dashboard from '../application/dashboard/Dashboard';
import Login from '../application/login/Login';

export default [
	{
		inMenu: true,
		path: '/dashboard',
		component: Dashboard
	},
	{
		inMenu: true,
		path: '/login',
		component: Login
	}
];