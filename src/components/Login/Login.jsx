import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginReduxForm } from './LoginForm';
import styles from './Login.module.scss';
import { login } from '../../redux/auth-reducer';

const Login = props => {
	const onSubmit = formData => {
		props.login(formData.email, formData.password, formData.rememberMe);
	};

	if (props.isAuth) {
		return <Navigate to={'/profile'} />;
	}

	return (
		<div className={styles.app_login}>
			<h1>Login</h1>
			<LoginReduxForm onSubmit={onSubmit} />
		</div>
	);
};

const mapStateToProps = state => ({
	isAuth: state.auth.isAuth,
});
export default connect(mapStateToProps, { login })(Login);
