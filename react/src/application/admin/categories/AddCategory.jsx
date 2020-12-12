import React from 'react';
import FormDataManager, { useFormDataContext } from '../../../context/FormDataManager';
import FormInput from '../../../components/forms/FormInput';
import { Button } from 'react-materialize';
import appRequest from '../../../utils/appRequest';
import { useSnackbar } from '../../../context/SnackBarManager';
import './categories.less';

const AddCategory = () => {
	const { formData: { name, description } } = useFormDataContext();
	const { addSnackBar } = useSnackbar();
	const addCategory = () => {
		appRequest({
			url: '/API/category/',
			method: 'POST',
			data: { name, description }
		}).then(({ data: { message } })=> {
			addSnackBar({ text:message });
			location.href = '../';
		});
	};

	return (
		<div className="flex-col">
			<h3>Panel dodawania kategorii</h3>
			<div className="card add-category">
				<FormInput name="name" label="Nazwa kategorii" />
				<FormInput name="description" label="Opis kategorii" />
				<FormInput name="image" label="Zdjecie kategorii" />
				<Button onClick={addCategory}>
                Zapisz
				</Button>
			</div>
		</div>
	);
};

AddCategory.propTypes = {};

export default () => (
	<FormDataManager>
		<AddCategory />
	</FormDataManager>
);