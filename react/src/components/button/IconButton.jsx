import React from 'react';
import PropTypes from 'prop-types';

const IconButton = ({ icon, children, className = '', ...rest }) => {
	return (
		<button className={`btn ${className}`} {...rest}>
			<i className="material-icons left">{icon}</i>
			{children}
		</button>
	);
};

IconButton.propTypes = {};

export default IconButton;