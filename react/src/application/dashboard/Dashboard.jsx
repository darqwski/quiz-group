import React, { useEffect, useState } from 'react';
import appRequest from '../../utils/appRequest';
import Loading from '../../components/loading/Loading';
import useAppRequest from '../../hooks/useAppRequest';
import './dashboard.less';

const SingleQuiz = ({ quizId, name, description }) => {
	const onClick=()=>{
		window.sessionStorage.setItem('quizId',quizId);
		window.location.href='../quiz/';
	}

	return (
		<div className="single-quiz card clickable" onClick={onClick}>
			<div className="card-title">{name}</div>
			<div className="card-content">{description}</div>
		</div>
	)

}

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
			{data?.recommended?.map((item,index)=>(
				<SingleQuiz {...item} key={`single-quiz-${index}`} />
			))}
		</div>
	);
};

export default Dashboard;