// @ts-nocheck
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo300.png';
import avatar from '../../assets/avatar.png';
import styles from './Header.module.scss';

const Header = props => {
	return (
		<header className={styles.app_header}>
			<img className={styles.app_header_logo} src={logo} alt='logo' />
			<div className={styles.app_header_loginBlock}>
				<img className={styles.avatar} src={avatar} alt='avatar' />
				{props.isAuth ? props.login : <NavLink to={'/login'}>Login</NavLink>}
			</div>
		</header>
	);
};

export default Header;
