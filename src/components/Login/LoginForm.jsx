import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { CustomFormValidator } from '../commons/FormsControl/FormsControl';
import styles from './Login.module.scss';

const LoginForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div className={styles.app_login_name}>
				<Field
					component={CustomFormValidator}
					name='login'
					placeholder='login'
					validate={[required, maxLengthCreator(30)]}
					type='input'
				/>
			</div>
			<div className={styles.app_login_pass}>
				<Field
					component={CustomFormValidator}
					name='password'
					placeholder='password'
					validate={[required, maxLengthCreator(30)]}
					type='input'
				/>
			</div>
			<div className={styles.app_login_checkbox}>
				<Field component='input' name='rememberMe' type='checkbox' />
				&ensp;Remember me
			</div>
			<button className={styles.app_login_button}>Login</button>
		</form>
	);
};

export const LoginReduxForm = reduxForm({
	form: 'login',
})(LoginForm);
