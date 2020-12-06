import React, { useEffect, useState } from 'react';
import appRequest from '../../utils/appRequest';
import Loading from '../../components/loading/Loading';

const Dashboard = () => {
	const [data, setData] = useState();
	const [loading, setLoading] = useState();
	const [refresh, setRefresh] = useState(false);

	useEffect(()=>{
		setLoading(true);
		appRequest({ url:'/API/user-info/' }).then(({ data })=>{
			setData(data);
			setLoading(false);
		});
	}, [refresh]);

	return loading ? <Loading /> : (
		<div>
			<h5>Twoje grupy</h5>
			{data?.map(({ description, userGroupId })=>(<li onClick={()=>{
				window.sessionStorage.setItem('userGroupId',userGroupId);
				window.location.href='../group/';
			}}>{description}</li>))}
			<h5>Nie rozwiązane quizy w grupach</h5>
			--TO DO --
		</div>
	);
};

export default Dashboard;