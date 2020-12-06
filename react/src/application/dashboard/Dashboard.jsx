import React, { useEffect, useState } from 'react';
import appRequest from '../../utils/appRequest';
import Loading from "../../components/loading/Loading";

const Dashboard = () => {
	const [data, setData] = useState();
	const [loading, setLoading] = useState(true);
	const [refresh, setRefresh] = useState(false);

	useEffect(()=>{
		appRequest({ url:'/API/user-info/' }).then(({ data })=>setData(data));
	}, []);

	return loading ? <Loading /> : <div>Dashboard</div>
};

export default Dashboard;