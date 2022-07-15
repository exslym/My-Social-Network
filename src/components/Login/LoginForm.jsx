import React from 'react';
import { reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../utils/validators/validators';
// import { FormValidator } from '../commons/FormControl/FormControl';
import { createField, Input } from '../commons/FormControl/FormControl';
import styles from './Login.module.scss';
import errorStyles from '../commons/FormControl/FormControl.module.scss';

const maxLength30 = maxLengthCreator(30);

const LoginForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			{/* <div className={styles.app_login_name}>
				<Field
					placeholder='email'
					name='email'
					type='input'
					validate={[required, maxLength30]}
					component={FormValidator}
				/>
			</div>
			<div className={styles.app_login_pass}>
				<Field
					placeholder='password'
					name='password'
					type='password'
					validate={[required, maxLength30]}
					component={FormValidator}
				/>
			</div> */}
			<div className={styles.app_login_name}>
				{/* <Field
					component={Input}
					name='email'
					placeholder='email'
					validate={[required, maxLength30]}
					type='input'
				/> */}
				{createField('email', 'email', [required, maxLength30], Input, { type: 'input' })}
			</div>
			<div className={styles.app_login_pass}>
				{/* <Field
					component={Input}
					name='password'
					placeholder='password'
					validate={[required, maxLength30]}
					type='password'
				/> */}
				{createField('password', 'password', [required, maxLength30], Input, { type: 'password' })}
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
	);
};

export const LoginReduxForm = reduxForm({
	form: 'login',
})(LoginForm);
