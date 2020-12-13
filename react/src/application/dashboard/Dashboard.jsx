import React from 'react';
import Loading from '../../components/loading/Loading';
import useAppRequest from '../../hooks/useAppRequest';
import SingleQuiz from './SingleQuiz';
import './dashboard.less';

const Dashboard = () => {
	const { data, loading } = useAppRequest({
		name: 'data',
		url: '/API/dashboard/',
	});

	return loading ? <Loading /> : (
		<div>
			<div className="dashboard-logo card purple darken-4 white-text">LOGO</div>
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