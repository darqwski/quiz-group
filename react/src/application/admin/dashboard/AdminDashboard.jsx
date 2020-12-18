import React from 'react';
import PropTypes from 'prop-types';

const AdminDashboard = () => {
	return (
		<div>
			<p><a href="../categories"> Edytuj kategorie </a></p>
			<p><a href="../quizes"> Zarządzaj quizami </a></p>
		</div>
	);
};

AdminDashboard.propTypes = {};

export default AdminDashboard;
