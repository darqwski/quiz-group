import React from 'react';
import PropTypes from 'prop-types';
import './value-desc.less';

const ValueDesc = ({ value, desc }) => {
	return (
		<div className="value-desc">
			<div className="desc">
				{desc}
			</div>
			<div className="value">
				{value}
			</div>
		</div>
	);
};

ValueDesc.propTypes = {
	value: PropTypes.string,
	desc: PropTypes.string
};

export default ValueDesc;