import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';
// import SideBar from '../SideBar/SideBar';
// import SideBarContainer from '../SideBar/SideBarContainer';

//* TYPES:
type PropsType = {};

const Navbar: React.FC<PropsType> = () => {
	// let activeLink = ({ isActive }) => (isActive ? styles.activelink : undefined);
	// let sideBar = props.store.getState().sideBar;

	return (
		<nav className={styles.navbar}>
			<ul>
				<li className={styles.navbar_li}>
					<NavLink
						to='/profile'
						className={({ isActive }) => (isActive ? styles.activelink : undefined)}
					>
						Profile
					</NavLink>
				</li>
				<li className={styles.navbar_li}>
					<NavLink
						to='/dialogs'
						className={({ isActive }) => (isActive ? styles.activelink : undefined)}
					>
						Messages
					</NavLink>
				</li>
				<li className={styles.navbar_li}>
					<NavLink
						to='/news'
						className={({ isActive }) => (isActive ? styles.activelink : undefined)}
					>
						News
					</NavLink>
				</li>
				<li className={styles.navbar_li}>
					<NavLink
						to='/settings'
						className={({ isActive }) => (isActive ? styles.activelink : undefined)}
					>
						Settings
					</NavLink>
				</li>
				<li className={styles.navbar_li}>
					<NavLink
						to='/users'
						className={({ isActive }) => (isActive ? styles.activelink : undefined)}
					>
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
