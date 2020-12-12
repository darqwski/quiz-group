import React from 'react';
import useAppRequest from '../../../hooks/useAppRequest';
import Loading from '../../../components/loading/Loading';
import FormDataManager, {useFormDataContext} from "../../../context/FormDataManager";
import FormInput from "../../../components/forms/FormInput";
import appRequest from "../../../utils/appRequest";
import {useSnackbar} from "../../../context/SnackBarManager";
import './categories.less';
import IconButton from "../../../components/button/IconButton";

const SingleCategory = ({ refresh }) => {
	const { formData: { categoryId, name, description  } } = useFormDataContext();
	const { addSnackBar } = useSnackbar();
	const onSave = () => {
		appRequest({
			url:'/API/category/',
			method: 'PUT',
			data: { categoryId, name, description }
		}).then(({ data: { message }})=>addSnackBar({text: message }))
	}
	const onDelete = () => {
		appRequest({
			url:'/API/category/',
			method: 'DELETE',
			data: { categoryId }
		}).then(({ data: { message }})=>{
			addSnackBar({text: message });
			refresh();
		})
	}

	return (
		<div className="card category-card">
			<FormInput name="name" label="Nazwa kategorii" />
			<FormInput name="description" label="Opis kategorii" />
			<button className="btn indigo darken-2 white-text" onClick={onSave}>
				<i className="material-icons">save</i>
			</button>
			<button className="btn-flat" onClick={onDelete}>
				<i className="material-icons">delete</i>
			</button>
		</div>
	)
};

const CategoriesDashboard = () => {
	const { data, loading, refresh } = useAppRequest({
		url: '/API/category/'
	});
	return loading ? <Loading/> : (
		<div>
			<div className="title-with-actions">
				<h3 className="title">
					Aktualne kategorie
				</h3>
				<div className="actions">
					<IconButton icon="add" onClick={()=>{location.href='add/'}} className="btn">Dodaj kategorie</IconButton>
				</div>
			</div>
			<div className="flex">
				{data?.map((item,index)=>(
					<FormDataManager initialData={item}>
						<SingleCategory {...item} key={`SingleCategory${index}`} refresh={refresh}/>
					</FormDataManager>
				))}
			</div>
		</div>
	);
};

CategoriesDashboard.propTypes = {};

export default CategoriesDashboard;