import React from 'react';
import type { LoginFormValuesType, LoginFormValuesTypeKeys } from './Login';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { createField, Input } from '../commons/FormControl/FormControl';
import styles from './Login.module.scss';
import errorStyles from '../commons/FormControl/FormControl.module.scss';

const maxLength30 = maxLengthCreator(30);

//* TYPES:
type LoginFormOwnPropsType = {
	captchaUrl: string | null;
};

const LoginForm: React.FC<
	InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType
> = ({ handleSubmit, error, captchaUrl }) => {
	/* 	return (
		<form onSubmit={props.handleSubmit}>
			<div className={styles.app_login_name}>
				<Field
					component={Input}
					name='email'
					placeholder='email'
					validate={[required, maxLength30]}
					type='input'
				/>
			</div>
			<div className={styles.app_login_pass}>
				<Field
					component={Input}
					name='password'
					placeholder='password'
					validate={[required, maxLength30]}
					type='password'
				/>
			</div>
			<div className={styles.app_login_checkbox}>
				{createField('', 'rememberMe', [], Input, { type: 'checkbox' })}
				<label htmlFor='rememberMe'>Remember me</label>
			</div>
			{props.captchaUrl && (
				<img className={styles.app_login_captchaImg} src={props.captchaUrl} alt='captcha' />
			)}
			{props.captchaUrl && createField('captcha input', 'captcha', [required], Input, {})}
			{props.error && <div className={errorStyles.formSummaryError}>{props.error}</div>}
			<button className={styles.app_login_button}>Login</button>
		</form>
	); */
	//* refactored
	return (
		<form onSubmit={handleSubmit}>
			<div className={styles.app_login_name}>
				{createField<LoginFormValuesTypeKeys>('email', 'email', [required, maxLength30], Input, {
					type: 'input',
				})}
			</div>
			<div className={styles.app_login_pass}>
				{createField<LoginFormValuesTypeKeys>(
					'password',
					'password',
					[required, maxLength30],
					Input,
					{ type: 'password' },
				)}
			</div>
			<div className={styles.app_login_checkbox}>
				{createField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', [], Input, {
					type: 'checkbox',
				})}
				<label htmlFor='rememberMe'>Remember me</label>
			</div>
			{captchaUrl && <img className={styles.app_login_captchaImg} src={captchaUrl} alt='captcha' />}
			{captchaUrl &&
				createField<LoginFormValuesTypeKeys>('captcha input', 'captcha', [required], Input, {})}
			{error && <div className={errorStyles.formSummaryError}>{error}</div>}
			<button className={styles.app_login_button}>Login</button>
		</form>
	);
};

export const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({
	form: 'login',
})(LoginForm);
