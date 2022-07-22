import React from 'react';
import type { AppStateType } from '../../redux/redux-store';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import LoginForm from './LoginForm';
import styles from './Login.module.scss';
import type { GetStringKeys } from '../commons/FormControl/FormControl';

//* TYPES:
export type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>;
export type LoginFormValuesType = {
	email: string;
	password: string;
	rememberMe: boolean;
	captcha: string;
};
type MapStatePropsType = {
	captchaUrl: string | null;
	isAuth: boolean;
};
type MapDispatchPropsType = {
	login: (email: string, password: string, rememberMe: boolean, captcha: string) => void;
};

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = props => {
	const onSubmit = (formData: LoginFormValuesType) => {
		props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
	};

	if (props.isAuth) {
		return <Navigate to={'/profile'} />;
	}

	return (
		<div className={styles.app_login}>
			<h1>Login</h1>
			<LoginForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
		</div>
	);
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
	captchaUrl: state.auth.captchaUrl,
	isAuth: state.auth.isAuth,
});
export default connect(mapStateToProps, { login })(Login);
