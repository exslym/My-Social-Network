// @ts-nocheck
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';
// import SideBar from '../SideBar/SideBar';
// import SideBarContainer from '../SideBar/SideBarContainer';

const Navbar = props => {
	let activeLink = ({ isActive }) => (isActive ? styles.activelink : undefined);
	// let sideBar = props.store.getState().sideBar;

	return (
		<nav className={styles.navbar}>
			<ul>
				<li className={styles.navbar_li}>
					<NavLink to='/profile' className={activeLink}>
						Profile
					</NavLink>
				</li>
				<li className={styles.navbar_li}>
					<NavLink to='/dialogs' className={activeLink}>
						Messages
					</NavLink>
				</li>
				<li className={styles.navbar_li}>
					<NavLink to='/news' className={activeLink}>
						News
					</NavLink>
				</li>
				<li className={styles.navbar_li}>
					<NavLink to='/settings' className={activeLink}>
						Settings
					</NavLink>
				</li>
				<li className={styles.navbar_li}>
					<NavLink to='/users' className={activeLink}>
						Users
						{/* <SideBarContainer /> */}
						{/* <SideBar friends={sideBar.friends} /> */}
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
