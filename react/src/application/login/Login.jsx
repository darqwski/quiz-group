import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormInput from '../../components/forms/FormInput';
import FormDataManager, { useFormDataContext } from '../../context/FormDataManager';
import appRequest from '../../utils/appRequest';
import { useSnackbar } from '../../context/SnackBarManager';
import {Button} from "react-materialize";
import './login.less';

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

	return (
		<div className="login-panel">
			<form className="card container" onSubmit={onSubmit}>
				<div className="card-title">
					<h3>Logowanie do QUIZ GROUP</h3>
				</div>
				<div className="card-content">
					<FormInput label="Login" name="login" />
					<FormInput label="Password" name="password" type="password" />
				</div>
				<div className="card-action">
					<Button type="submit" className="deep-purple darken-4">Zaloguj</Button>
					<a className="btn-flat deep-purple-text darken-4" href="../register/">Zarejestruj</a>
				</div>
			</form>
		</div>
	);
};

Login.propTypes = {};

export default () => (
	<FormDataManager>
		<Login/>
	</FormDataManager>
);