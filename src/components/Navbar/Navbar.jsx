import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
	return (
		<nav className={styles.app_nav}>
			<ul>
				<li className={styles.app_nav_li}>
					<NavLink
						to='/profile'
						className={({ isActive }) => (isActive ? styles.activelink : undefined)}
					>
						Profile
					</NavLink>
				</li>
				<li className={styles.app_nav_li}>
					<NavLink
						to='/dialogs'
						className={({ isActive }) => (isActive ? styles.activelink : undefined)}
					>
						Messages
					</NavLink>
				</li>
				<li className={styles.app_nav_li}>
					<NavLink
						to='/news'
						className={({ isActive }) => (isActive ? styles.activelink : undefined)}
					>
						News
					</NavLink>
				</li>
				<li className={styles.app_nav_li}>
					<NavLink
						to='/settings'
						className={({ isActive }) => (isActive ? styles.activelink : undefined)}
					>
						Settings
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
