import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext);

export const AppManager = ({ children }) => {
	const { serverData: { login } } = window;
	const isLogged = () => !!login;
	console.log(login)
	return (
		<AppContext.Provider value={{
			isLogged, login
		}}>
			{children}
		</AppContext.Provider>
	);
};

AppManager.propTypes = {
	children: PropTypes.node
};

export default AppManager;
