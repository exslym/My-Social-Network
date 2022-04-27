import React from 'react';
import logo from './assets/logo192.png';
import styles from './Header.module.css';

const Header = () => {
	return (
		<header className={styles.app_header}>
			<img className={styles.logo} src={logo} alt='logo' />
			<p>Header</p>
		</header>
	);
};

export default Header;
