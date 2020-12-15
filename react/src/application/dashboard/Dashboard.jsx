import React from 'react';
import Loading from '../../components/loading/Loading';
import useAppRequest from '../../hooks/useAppRequest';
import SingleQuiz from './SingleQuiz';
import './dashboard.less';
import { useAppContext } from '../../context/AppManager';

const Dashboard = () => {
	const { data, loading } = useAppRequest({
		name: 'data',
		url: '/API/dashboard/',
	});
	const { isLogged, login } = useAppContext();

	return loading ? <Loading /> : (
		<div>
			<div className="dashboard-nav card purple darken-4 white-text">
				<div className="dashboard-menu">

				</div>
				<div className="dashboard-logo">QUIZ-GROUP</div>
				<div className="dashboard-auth">
					{isLogged() ? (
						<>
							<a className="btn-flat white-text" href="../profile/">
								<i className="material-icons left">person</i>
								{login}
							</a>
							<a className="btn-flat white-text" href="?logout">
								Wyloguj
							</a>
						</>
					) : (
						<>
							<a className="btn-flat white-text" href="../login/">
									Zaloguj
							</a>
							<a className="btn-flat white-text" href="../register/">
								Zarejestruj
							</a>
						</>
					)}
				</div>
			</div>
			<div className="dashboard-description"> Może jakiś nius?</div>
			<div className="dashboard-tabs">
				<div className="dashboard-tab purple darken-2 white-text clickable">Popularne</div>
				<div className="dashboard-tab purple darken-2 white-text clickable">Proponowane</div>
				<div className="dashboard-tab purple darken-2 white-text clickable">Kategorie</div>
			</div>
			<div className="flex">
				{data && data.recommended.map((item,index)=>(
					<SingleQuiz {...item} key={`single-quiz-${index}`} />
				))}
			</div>
		</div>
	);
};

export default Dashboard;