import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from '../../../context/SnackBarManager';
import appRequest from '../../../utils/appRequest';
import NavBar from '../../../components/navbar/NavBar';

const ChangePassword = () => {
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [passwordRepeat, setPasswordRepeat] = useState('');
	const [error, setError] = useState(undefined);
	const { addSnackBar } = useSnackbar();
	const onSave = () => {
		if(!oldPassword ||!newPassword || !passwordRepeat){
			setError('Brak podanego hasła');
			return;
		}

		if(newPassword !== passwordRepeat){
			setError('Podane hasła różnią się');
			return;
		}
		setError(undefined);
		appRequest({
			url:'/API/change-password/',
			method: 'POST',
			data: { oldPassword,newPassword }
		}).then(({ data: { message }, status } )=>{
			if(status === 200){
				addSnackBar({ text: `${message}, za 5s nastąpi przekierowanie na stronę głowną` });
				setTimeout(()=>window.location.href='../', 5000);
			} else {
				addSnackBar({ text: message });
			}
		});
	};

	return (
		<>
			<NavBar title="Zmiana hasła" back />
			<div className="card register-card">
				<div className="card-title">
					<h3>Panel zmiany hasła</h3>
				</div>
				<div className="card-content">
					<div>
						<label>Podaj stare hasło</label>
						<input value={oldPassword} onChange={({ target: { value } })=>setOldPassword(value)} type="password" />
					</div>
					<div>
						<label>Podaj nowe hasło</label>
						<input value={newPassword} onChange={({ target: { value } })=>setNewPassword(value)} type="password" />
					</div>
					<div>
						<label>Powtórz hasło</label>
						<input value={passwordRepeat} onChange={({ target: { value } })=>setPasswordRepeat(value)} type="password" />
					</div>
					{error && <div className="error-text red-text">{error}!</div>}
				</div>
				<div className="card-action">
					<button className="btn-large green" onClick={onSave}>Zmień hasło</button>
				</div>
			</div>
		</>
	);
};

ChangePassword.propTypes = {};

export default ChangePassword;
