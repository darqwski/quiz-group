import React from 'react';
import PropTypes from 'prop-types';
import { useFormDataContext } from '../../context/FormDataManager';
import WithLabel from './WithLabel';

const FormInput = ({ label, name, white, ...rest }) => {
	const { setField, formData: { [name]: value } } = useFormDataContext();

	return (
		<WithLabel label={label} white={white}>
			<input name={name} onChange={setField(name)} value={value || ''} {...rest} />
		</WithLabel>
	);
};

FormInput.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	white: PropTypes.bool
};

export default FormInput;