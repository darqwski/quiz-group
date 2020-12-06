import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormInput from '../../components/forms/FormInput';
import FormDataManager, { useFormDataContext } from '../../context/FormDataManager';
import appRequest from '../../utils/appRequest';
import { useSnackbar } from '../../context/SnackBarManager';

const Login = () => {
	const {  formData: { login, password } } = useFormDataContext();
	const { addSnackBar } = useSnackbar();
	const onSubmit = (e) => {
		e.preventDefault();

		appRequest({
			url:'/API/login/',
			method: 'POST',
			data: { login, password }
		}).then(({ data, status })=>{
			console.log(data,status);
			if(status === 200){
				window.location.href='../dashboard/';
			} else {
				addSnackBar({ text: data.message });
			}
		});
	};

	const logout = () => {
		appRequest({
			url:'/API/login',
			method: 'DELETE'
		});
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<FormInput label="Login" name="login" />
				<FormInput label="Password" name="password" type="password" />
				<button className="btn">Login</button>
			</form>
			<button className="btn" onClick={logout}>Logout</button>

		</div>
	);
};

Login.propTypes = {};

export default () => (
	<FormDataManager>
		<Login/>
	</FormDataManager>
);