import React from 'react';
import PropTypes from 'prop-types';

const SingleCategoryView = ({ setView, setCategoryId, category }) => {
	const { name, image, categoryId } = category;
	const onClick=()=>{
		setCategoryId(categoryId);
		setView('selected-category');
	};

	return (
		<div
			className="card category-view clickable"
			style={{ background: image ? `url('${image}')` : '#FDA' }}
			onClick={onClick}
		>
			<div className="category-view-name">{name}</div>
		</div>
	);
};

SingleCategoryView.propTypes = {
	setView: PropTypes.func, setCategoryId: PropTypes.func,
	category: PropTypes.shape({
		name: PropTypes.string,
		image: PropTypes.string,
		categoryId: PropTypes.string
	})
};

export default SingleCategoryView;