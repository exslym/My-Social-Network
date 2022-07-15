import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { LoginReduxForm } from './LoginForm';
import styles from './Login.module.scss';

const Login = props => {
	const onSubmit = formData => {
		props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
	};

	if (props.isAuth) {
		return <Navigate to={'/profile'} />;
	}

	return (
		<div className={styles.app_login}>
			<h1>Login</h1>
			<LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
		</div>
	);
};

const mapStateToProps = state => ({
	captchaUrl: state.auth.captchaUrl,
	isAuth: state.auth.isAuth,
});
export default connect(mapStateToProps, { login })(Login);
