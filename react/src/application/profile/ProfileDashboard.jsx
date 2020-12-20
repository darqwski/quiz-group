import React from 'react';
import './profile.less';
import ValueDesc from '../../components/value-desc/ValueDesc';
import useAppRequest from '../../hooks/useAppRequest';
import Loading from '../../components/loading/Loading';
import NavBar from '../../components/navbar/NavBar';
import SingleCreateQuiz from "./SingleCreateQuiz";

const ProfileDashboard = () => {
	const { data, loading } = useAppRequest({
		url: '/API/user-info/'
	});
	const { user, games, created } = data || {};
	const { email, login, joined } = user || {};
	const { categories, average, all } = games || {};
	const categoriesValue = categories && categories.map(({ categoryName, categoryCount })=>(
		`${categoryName} (${parseInt(categoryCount*100/+all)}%)
	`)).join(',');

	return loading ? <Loading/> : (
		<>
			<NavBar title="Profil użytkownika" back/>
			<div className="profile card container">
				<div className="profile-section white">
					<h3 className="profile-section-title">
					Użytkownik
					</h3>
					<div className="flex">
						<div className="flex-grow">
							<ValueDesc value={login} desc="Login" />
							<ValueDesc value={email} desc="Email" />
							<ValueDesc value={joined} desc="Data dołączenia" />
						</div>
						<div className="flex-grow profile-actions">
							<a className="btn-flat"><i className="material-icons left">change_circle</i>Zmień hasło</a>
							<a className="btn-flat"><i className="material-icons left">edit</i>Edytuj dane</a>
							<a className="btn-flat"><i className="material-icons left">delete</i>Usuń konto</a>
						</div>
					</div>
				</div>
				<div className="profile-border deep-purple darken-4" />
				<div className="profile-section white">
					<h3 className="profile-section-title">
					Zagrane Quizy
					</h3>
					<ValueDesc value={all} desc="Liczba wykonanych quizów" />
					<ValueDesc value={`${parseInt(average*100)}%`} desc="Średni wynik quizów" />
					<ValueDesc value={categoriesValue} desc="Najcześciej grane kategorie" />
				</div>
				<div className="profile-border deep-purple darken-4" />
				<div className="profile-section white">
					<h3 className="profile-section-title">
					Utworzone Quizy
					</h3>
					{created && created.map(({ name, quizId, average })=>(
						<SingleCreateQuiz quizId={quizId} name={name} average={average} key={`created-${quizId}`} />
					))}
				</div>
			</div>
		</>
	);
};

ProfileDashboard.propTypes = {};

export default ProfileDashboard;
