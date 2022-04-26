import React from 'react';
import styles from './Header.module.css';

const Header = () => {
	return (
		<header className={styles.app_header}>
			<img src='./logo192.png' alt='logo'></img>
			<p>Header</p>
		</header>
	);
};

export default Header;
