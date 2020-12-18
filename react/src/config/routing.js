import Dashboard from '../application/dashboard/Dashboard';
import Login from '../application/login/Login';
import GroupDashboard from '../application/group/GroupDashboard';
import QuizDashboard from '../application/quiz/QuizDashboard';
import GameDashboard from '../application/game/GameDashboard';
import CreateQuiz from '../application/create-quiz/CreateQuiz';
import CategoriesDashboard from '../application/admin/categories/CategoriesDashboard';
import AddCategory from '../application/admin/categories/AddCategory';
import Register from '../application/register/Register';
import ProfileDashboard from '../application/profile/ProfileDashboard';
import AdminDashboard from "../application/admin/dashboard/AdminDashboard";
import QuizesDashboard from "../application/admin/quizes/QuizesDashboard";

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
	},
	{
		inMenu: true,
		path: '/create-quiz',
		component: CreateQuiz
	},
	{
		inMenu: true,
		path: '/admin/dashboard',
		component: AdminDashboard
	},
	{
		inMenu: true,
		path: '/admin/quizes',
		component: QuizesDashboard
	},
	{
		inMenu: true,
		path: '/admin/categories',
		component: CategoriesDashboard
	},
	{
		inMenu: true,
		path: '/admin/categories/add',
		component: AddCategory
	},
	{
		inMenu: true,
		path: '/register',
		component: Register
	},
	{
		inMenu: true,
		path: '/profile',
		component: ProfileDashboard
	}
];
