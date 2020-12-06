import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SnackBarManager from './context/SnackBarManager';
import routing from './config/routing';
import { ROUTER_APP_PREFIX } from './config/app-config';
import ModalManager from './context/ModalManager';

const App = () => {
	return (
		<ModalManager>
			<SnackBarManager>
				<Router>
					{routing.map(({ exact, path, component }, index)=>(
						<Route
							exact={exact}
							path={`${ROUTER_APP_PREFIX}${path}`}
							component={component}
							key={`routing-${index}`}
						/>
					))}
				</Router>
			</SnackBarManager>
		</ModalManager>
	);
};

App.propTypes = {};

export default App;