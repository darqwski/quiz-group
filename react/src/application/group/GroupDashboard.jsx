import React from 'react';
import PropTypes from 'prop-types';
import useAppRequest from '../../hooks/useAppRequest';
import Loading from "../../components/loading/Loading";

const userGroupId = window.sessionStorage.getItem('userGroupId');

const GroupDashboard = () => {
	const { loading, groups, } = useAppRequest({ url: '/API/group-info/', method: 'POST', data: { userGroupId }, name: "groups" });
	console.log(groups)
	return loading ? <Loading/> : (
		<div>
			<h3>Users</h3>
			{groups?.users?.map(({login})=><p>{login}</p>)}
			<h3>Quizes</h3>
			{groups?.quizes?.map(({quizId, name})=>(
				<p onClick={()=>{
					window.sessionStorage.setItem('quizId',quizId);
					window.location.href='../quiz/';
				}}>{name}</p>
			))}
		</div>
	);
};

GroupDashboard.propTypes = {};

export default GroupDashboard;