import React from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
	return (
		<nav className={styles.app_nav}>
			<ul>
				<li className={styles.app_nav_li}>
					<a href='#'>Profile</a>
				</li>
				<li className={styles.app_nav_li}>
					<a href='#'>Messaages</a>
				</li>
				<li className={styles.app_nav_li}>
					<a href='#'>News</a>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
