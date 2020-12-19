import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-materialize';
import './modal.css';

const Modal = ({
	children,
	title = 'Confirm Action',
	message,
	confirmText = 'Confirm',
	declineText = 'Cancel',
	declineAction= ()=>{},
	confirmAction= ()=>{}
}) => {
	return (
		<div className="modal-background">
			<div className="modal" >
				<div className="modal-content">
					{title && <h4>{title}</h4>}
					{message && <p>{message}</p>}
					{children}
				</div>
				<div className="modal-footer">
					<Button flat className="waves-effect waves-green" onClick={confirmAction}>{confirmText}</Button>
					<Button flat className="waves-effect waves-green" onClick={declineAction}>{declineText}</Button>
				</div>
			</div>
		</div>
	);
};

Modal.propTypes = {
	children: PropTypes.any,
	title: PropTypes.string,
	message: PropTypes.string,
	confirmText: PropTypes.string,
	declineText: PropTypes.string,
	declineAction: PropTypes.func,
	confirmAction: PropTypes.func
};

export default Modal;
