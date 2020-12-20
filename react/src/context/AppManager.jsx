import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);

export const AppManager = ({ children }) => {
	const { serverData: { login, admin } } = window;
	const isLogged = () => !!login;
	const isAdmin = () => !!admin;

	return (
		<AppContext.Provider value={{
			isLogged, login, isAdmin
		}}>
			{children}
		</AppContext.Provider>
	);
};

AppManager.propTypes = {
	children: PropTypes.node
};

export default AppManager;
