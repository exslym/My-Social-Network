import React from 'react';
import { NavLink } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import styles from './Navbar.module.css';

const Navbar = props => {
	let activeLink = ({ isActive }) => (isActive ? styles.activelink : undefined);

	return (
		<nav className={styles.app_nav}>
			<ul>
				<li className={styles.app_nav_li}>
					<NavLink to='/profile' className={activeLink}>
						Profile
					</NavLink>
				</li>
				<li className={styles.app_nav_li}>
					<NavLink to='/dialogs' className={activeLink}>
						Messages
					</NavLink>
				</li>
				<li className={styles.app_nav_li}>
					<NavLink to='/news' className={activeLink}>
						News
					</NavLink>
				</li>
				<li className={styles.app_nav_li}>
					<NavLink to='/settings' className={activeLink}>
						Settings
					</NavLink>
				</li>
				<li className={styles.app_nav_li}>
					<NavLink to='/friends' className={activeLink}>
						<SideBar friends={props.sideBar.friends} />
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
