import React from 'react';
import PropTypes from 'prop-types';

const WithLabel = ({ children, label, white = false }) => {
	return (
		<div>
			{label && <label className={white ? 'white-text': ''}>{label}</label>}
			{children}
		</div>
	);
};

WithLabel.propTypes = {
	label: PropTypes.string,
	children: PropTypes.any,
	white: PropTypes.bool,
	withMargin: PropTypes.bool
};

export default WithLabel;