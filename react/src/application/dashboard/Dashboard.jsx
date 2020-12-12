import React, { useEffect, useState } from 'react';
import appRequest from '../../utils/appRequest';
import Loading from '../../components/loading/Loading';
import useAppRequest from '../../hooks/useAppRequest';

const Dashboard = () => {

	const { data, loading } = useAppRequest({
		name: 'data',
		url: '/API/user-info/',
	});

	return loading ? <Loading /> : (
		<div>
			<div>LOGO</div>
			<div>
				<div>Popularne</div>
				<div>Proponowane</div>
				<div>Kategorie</div>
			</div>
			{data?.availableQuizes?.map(({ name, quizId })=>(<li onClick={()=>{
				window.sessionStorage.setItem('quizId',quizId);
				window.location.href='../quiz/';
			}}>{name}</li>))}
		</div>
	);
};

export default Dashboard;