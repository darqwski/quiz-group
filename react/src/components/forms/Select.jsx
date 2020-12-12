import React from 'react';
import PropTypes from 'prop-types';

const Select = ({
	data = [],
	name,
	dataName,
	selected,
	onChange
}) => {

	return (
		<select name={name} onChange={onChange}>
			<option value={null}>Wybierz {dataName || ''}</option>
			{data.map(({ value, text }, index)=>(
				<option
					key={`select-${name || dataName || Math.random()}-item-${index}`}
					value={value}
					selected={selected === value ? true : undefined}
				>
					{text}
				</option>
			))}
		</select>
	);
};

Select.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.any ,
		text: PropTypes.string
	})),
	name: PropTypes.string,
	dataName: PropTypes.string,
	selected: PropTypes.any,
	onChange: PropTypes.func
};

export default Select;