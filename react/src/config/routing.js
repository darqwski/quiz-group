import Dashboard from '../application/dashboard/Dashboard';
import Login from '../application/login/Login';
import GroupDashboard from '../application/group/GroupDashboard';
import QuizDashboard from '../application/quiz/QuizDashboard';
import GameDashboard from '../application/game/GameDashboard';

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
	},
	{
		inMenu: true,
		path: '/group',
		component: GroupDashboard
	},
	{
		inMenu: true,
		path: '/quiz',
		component: QuizDashboard
	},
	{
		inMenu: true,
		path: '/game',
		component: GameDashboard
	}
];