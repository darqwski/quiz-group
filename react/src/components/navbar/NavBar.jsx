import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from '../../context/AppManager';
import { APP_NAME } from '../../config/app-config';
import './navbar.less';

const NavBar = ({ title = 'QUIZ-GROUP', back = false }) => {
	const { isLogged, isAdmin, login } = useAppContext();

	return (
		<div className="navbar card purple darken-4 white-text">
			<div className="navbar-menu">
				{back && (<a href="../"><i className="material-icons white-text">arrow_back</i></a>)}
				{!back && isAdmin() &&  (
					<a className="btn-flat white-text" href={`/${APP_NAME}/admin/dashboard/`}> Administracja </a>
				)}
			</div>
			<div className="navbar-logo">{title}</div>
			<div className="navbar-auth">
				{isLogged() ? (
					<>
						<a className="btn-flat white-text" href={`/${APP_NAME}/profile/`}>
							<i className="material-icons left">person</i>
							{login}
						</a>
						<a className="btn-flat white-text" href="?logout">
                            Wyloguj
						</a>
					</>
				) : (
					<>
						<a className="btn-flat white-text" href={`/${APP_NAME}/login/`}>
                            Zaloguj
						</a>
						<a className="btn-flat white-text" href={`/${APP_NAME}/register/`}>
                            Zarejestruj
						</a>
					</>
				)}
			</div>
		</div>
	);
};

NavBar.propTypes = {};

export default NavBar;
