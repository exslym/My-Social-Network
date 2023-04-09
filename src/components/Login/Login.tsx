import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login, useTypedDispatch } from '../../redux/auth-reducer';
import type { AppStateGlobalType } from '../../redux/redux-store';
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
	const captchaUrl = useSelector((state: AppStateGlobalType) => state.auth.captchaUrl);
	const isAuth = useSelector((state: AppStateGlobalType) => state.auth.isAuth);
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
			{/* <p className={styles.app_login_testUserInfo}>
				<i>use info below for testing:</i>
				login: <span>000.exs@gmail.com</span>
				<br />
				pass: <span>$TUsnRe72</span>
			</p> */}

			<div className={styles.textBlock}>
				<p className={styles.textBlock_title}>Test access for this project:</p>
				<p className={styles.textBlock_login}>
					Login: <strong>free@samuraijs.com</strong>
				</p>
				<button
					className={styles.textBlock_copyButton}
					onClick={() => navigator.clipboard.writeText('free@samuraijs.com')}
				>
					Copy
				</button>
				<p className={styles.textBlock_pass}>
					Password: <strong>free</strong>
				</p>

				<p className={styles.textBlock_links}>
					<strong>GitHub Project Source Code:</strong>
					<a
						href='https://github.com/exslym/My-Social-Network/'
						target='_blank'
						rel='noopener noreferrer'
					>
						https://github.com/exslym/My-Social-Network
					</a>
				</p>
			</div>
		</div>
	);
};
