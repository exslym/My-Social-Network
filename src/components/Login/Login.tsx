import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login, useTypedDispatch } from '../../redux/auth-reducer';
import type { AppStateType } from '../../redux/redux-store';
import type { GetStringKeys } from '../commons/FormControl/FormControl';
import styles from './Login.module.scss';
import LoginForm from './LoginForm';

//* TYPES:
export type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>;
export type LoginFormValuesType = {
	email: string;
	password: string;
	rememberMe: boolean;
	captcha: string;
};
// type MapDispatchPropsType = {
// 	login: (email: string, password: string, rememberMe: boolean, captcha: string) => void;
// };

export const LoginPage: React.FC = () => {
	const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
	const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
	// const dispatch = useDispatch();
	const dispatch = useTypedDispatch();

	const onSubmit = (formData: LoginFormValuesType) => {
		dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
	};

	if (isAuth) {
		return <Navigate to={'/profile'} />;
	}

	return (
		<div className={styles.app_login}>
			<h1>Login</h1>
			<LoginForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
			<p className={styles.app_login_testUserInfo}>
				<i>use info below for testing:</i>
				login: <span>000.exs@gmail.com</span>
				<br />
				pass: <span>$TUsnRe72</span>
			</p>
		</div>
	);
};
