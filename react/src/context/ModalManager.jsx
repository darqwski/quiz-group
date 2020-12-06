import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../components/modal/Modal';

export const ModalContext = createContext();
export const useModal = () => useContext(ModalContext);

const generateId = () => `snackbar-${Math.floor(Math.random() * (1000))}`;

const ModalManager = ({ children }) => {
	const [modals, setModals] = useState({});
	const addModal = ({ confirmAction,declineAction, ...props }) => {
		const id = generateId();
		const removeModal = () => {
			// eslint-disable-next-line no-unused-vars
			const { [id]: toDelete, ...rest } = modals;
			setModals(rest);
		};
		setModals(state=>({
			...state,
			[id]: {
				...props,
				confirmAction: () => {
					confirmAction && confirmAction();
					removeModal();
				},
				declineAction: () => {
					declineAction && declineAction();
					removeModal();
				}
			}
		}));
	};
	addModal.propTypes = Modal.propTypes;

	return (
		<ModalContext.Provider value={{ addModal }}>
			{children}
			{
				Object.entries(modals).map(([key, item])=>(
					<Modal {...item} key={key} />
				))
			}
		</ModalContext.Provider>
	);
};

ModalManager.propTypes = {
	children: PropTypes.any
};

export default ModalManager;