import React from 'react';
import PropTypes from 'prop-types';
import Select from './Select';
import WithLabel from './WithLabel';
import { useFormDataContext } from '../../context/FormDataManager';

const FormSelect = ({ data, label, name }) => {
	const { setField, formData: { [name]: value } } = useFormDataContext();

	return (
		<WithLabel label={`Wybierz ${label}`}>
			<Select
				selected={value}
				data={data}
				dataName={label}
				onChange={setField(name)}
			/>
		</WithLabel>
	);
};

FormSelect.propTypes = {
	data: PropTypes.array,
	label: PropTypes.string,
	name: PropTypes.string
};

export default FormSelect;