import React, { useEffect, useState } from 'react';
import Loading from '../../components/loading/Loading';
import NavBar from '../../components/navbar/NavBar';
import useAppRequest from '../../hooks/useAppRequest';
import { useAppContext } from '../../context/AppManager';
import appRequest from '../../utils/appRequest';
import SingleQuiz from './SingleQuiz';
import SingleCategoryView from './SingleCategoryView';
import './dashboard.less';

const Dashboard = () => {
	const { data, loading } = useAppRequest({
		name: 'data',
		url: '/API/dashboard/',
	});
	const [ view, setView ] = useState('popular');
	const [ categoryQuizes, setCategoryQuizes ] = useState();
	const [ categoryId, setCategoryId ] = useState();
	const { isLogged } =useAppContext();
	useEffect(()=>{
		if(!categoryId){
			return;
		}

		appRequest({
			url: `/API/quiz/?categoryId=${categoryId}`
		}).then(({ data })=>setCategoryQuizes(data));
	}, [categoryId]);

	return loading ? <Loading /> : (
		<div className="dashboard">
			<NavBar />
			<div className="dashboard-description">
				<div className="card dashboard-notice">
					<div className="dashboard-notice-text">
						{data?.lastInfo.text}
					</div>
					<div className="flex">
						<div className="dashboard-notice-author">{data?.lastInfo.login}</div>
						<div className="dashboard-notice-date">{data?.lastInfo.date}</div>
					</div>
				</div>
			</div>
			{isLogged() && (
				<a className="dashboard-add-quiz blue darken-2 white-text clickable" href="../create-quiz" >
					Brak ciekawych quizów? Dodaj własny!
				</a>
			)}
			<div className="dashboard-tabs">
				<div
					className="dashboard-tab purple darken-2 white-text clickable"
					onClick={()=>setView('popular')}
				>
					Popularne
				</div>
				{false &&(<div
					className="dashboard-tab purple darken-2 white-text clickable"
					onClick={()=>setView('proposed')}
				>
					Proponowane
				</div>)}
				<div
					className="dashboard-tab purple darken-2 white-text clickable"
					onClick={()=>setView('categories')}
				>
					Kategorie
				</div>
			</div>
			{view === 'popular' && (
				<div className="flex">
					{data && data.popular.map((item,index)=>(
						<SingleQuiz {...item} key={`single-quiz-${index}`} />
					))}
				</div>
			)}
			{view === 'proposed' && (
				<div className="flex">
					{data && data.recommended.map((item,index)=>(
						<SingleQuiz {...item} key={`single-quiz-${index}`} />
					))}
				</div>
			)}
			{view ==='categories' && (
				<div className="flex">
					{data && data.categories.map((item,index)=>(
						<SingleCategoryView
							category={item}
							setCategoryId={setCategoryId}
							setView={setView}
							key={`SingleCategoryView-${index}`} />
					))}
				</div>
			)}
			{view ==='selected-category' && (
				<div className="flex">
					{categoryQuizes && categoryQuizes.map((item,index)=>(
						<SingleQuiz {...item} key={`single-quiz-${index}`} />
					))}
				</div>
			)}
		</div>
	);
};

export default Dashboard;
