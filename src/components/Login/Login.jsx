import React from 'react';
import { LoginReduxForm } from './LoginForm';
import styles from './Login.module.scss';

const Login = props => {
	const onSubmit = formData => {
		console.log(formData);
	};

	return (
		<div className={styles.app_login}>
			<h1>Login</h1>
			<LoginReduxForm onSubmit={onSubmit} />
		</div>
	);
};

export default Login;
