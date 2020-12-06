import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

export const FormDataContext =createContext({});

/**
 * @typedef {Object} formDataContext
 * @property {function} setField - function which returns function to setField in formDataContext state
 * @property {Object} formData - state in formDataContext
 * @property {function} setFormData - simple setState in formDataContext
 * @property {function} addError - function to add Error to errors state
 * @property {function} clearErrors - function to reset errors state
 * @property {Array} errorMessages -  errors state
 */
/**
 *
 * @return { formDataContext }
 */
export const useFormDataContext = () => useContext(FormDataContext);
const FormDataManager = ({ initialData = {}, children }) => {
	const [formData, setFormData] = useState(initialData);
	const [errorMessages, setErrorMessages] = useState([]);
	const setField = name => ({ target: { value } }) => {
		setFormData(data=>({ ...data, [name]: value }));
	};

	const addError = message => setErrorMessages(messages=>[...messages, message]);
	const clearErrors = () => setErrorMessages([]);

	return (
		<FormDataContext.Provider value={{
			setField,
			formData,
			setFormData,
			addError,
			clearErrors,
			errorMessages
		}}>
			{children}
		</FormDataContext.Provider>
	);
};

FormDataManager.propTypes = {
	initialData: PropTypes.object,
	children: PropTypes.any
};

export default FormDataManager;