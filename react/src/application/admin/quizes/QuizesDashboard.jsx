import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useAppRequest from '../../../hooks/useAppRequest';
import Loading from '../../../components/loading/Loading';
import ValueDesc from '../../../components/value-desc/ValueDesc';
import './quiz-dashboard.less';
import { useSnackbar } from '../../../context/SnackBarManager';
import appRequest from '../../../utils/appRequest';

const SingleQuiz = ({ item, setSelected }) => {
	const { login, category, quizName, playedTimes, isActive } = item;
	const onClick = () => setSelected(item);

	return (
		<div className="card single-quiz clickable" onClick={onClick}>
			<div className="card-title">
				<strong>{quizName}</strong>
			</div>
			<div className="card-content">
				<ValueDesc value={login} desc="Autor" />
				<ValueDesc value={category} desc="Kategoria" />
				<ValueDesc value={playedTimes} desc="Ilość rozegranych gier" />
				<p className={+isActive ? 'green' : 'red'}>{+isActive ? 'Aktywny' : 'Nieaktywny'}</p>
			</div>
			<div className="card-actions">

			</div>
		</div>
	);

};

const QuizesDashboard = () => {
	const [page, setPage] = useState(0);
	const { addSnackBar } = useSnackbar();
	const [selected, setSelected] = useState();
	const{ loading, data, refresh } = useAppRequest({
		url:`/API/admin/quizes?page=${page}`,
	});
	const activate = () => {
		appRequest({
			url: '/API/admin/quizes',
			method: 'PUT',
			data: {
				action: 'activate',
				quizId: selected.quizId
			}
		}).then(({ data: { message } })=>addSnackBar({ text: message })).then(refresh);
	};
	const deactivate = () => {
		appRequest({
			url: '/API/admin/quizes',
			method: 'PUT',
			data: {
				action: 'deactivate',
				quizId: selected.quizId
			}
		}).then(({ data: { message } })=>addSnackBar({ text: message })).then(refresh);
	};

	return loading ? <Loading/> :(
		<div>
			<div className="flex">
				{data && data.map((item, key)=><SingleQuiz item={item} key={`SingleQuiz-${key}`} setSelected={setSelected}/> )}
			</div>
			{selected && (
				<div className="modal-background" onClick={()=>setSelected()}>
					<div className="modal" >
						<h3>{selected.name}</h3>
						<p>Dostępne akcje</p>
						<button
							className={`btn ${+selected.isActive ? 'red' : 'green'}`}
							onClick={+selected.isActive ? deactivate : activate}>
							{+selected.isActive ? 'Dezaktywuj' : 'Aktywuj'}
						</button>
					Zażądaj zmiany
					</div>
				</div>
			)}
		</div>
	);
};

QuizesDashboard.propTypes = {};

export default QuizesDashboard;
