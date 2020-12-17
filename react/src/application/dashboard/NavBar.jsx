import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from '../../context/AppManager';

const NavBar = () => {
	const { isLogged, login } = useAppContext();

	return (
		<div className="dashboard-nav card purple darken-4 white-text">
			<div className="dashboard-menu">

			</div>
			<div className="dashboard-logo">QUIZ-GROUP</div>
			<div className="dashboard-auth">
				{isLogged() ? (
					<>
						<a className="btn-flat white-text" href="../profile/">
							<i className="material-icons left">person</i>
							{login}
						</a>
						<a className="btn-flat white-text" href="?logout">
                            Wyloguj
						</a>
					</>
				) : (
					<>
						<a className="btn-flat white-text" href="../login/">
                            Zaloguj
						</a>
						<a className="btn-flat white-text" href="../register/">
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