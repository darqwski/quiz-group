import { useEffect, useState } from 'react';
import appRequest from '../utils/appRequest';

export default ({ name, url, method, data }) => {
	const [responseData, setResponseData] = useState();
	const [loading, setLoading] = useState();
	const [isRefresh, setRefresh] = useState(false);
	const [responseCode, setResponseCode] = useState(0);

	useEffect(()=>{
		setLoading(true);
		appRequest({ url, method, data }).then(({ data, status })=>{
			setResponseData(data);
			setResponseCode(status);
			setLoading(false);
		});
	}, [isRefresh]);

	const refresh = () => setRefresh(i=>!i);

	return {
		[name]: responseData,
		refresh,
		loading,
		responseCode
	};
};