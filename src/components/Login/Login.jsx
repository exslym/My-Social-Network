import React from 'react';
import styles from './Login.module.scss';

const Login = props => {
	return (
		<div className={styles.app_login}>
			<input id='userLogin' type='login' className={styles.app_login_name} />
			<input id='userPassword' type='password' required className={styles.app_login_pass} />
			<button className={styles.app_login_button}>Login</button>
		</div>
	);
};

export default Login;
