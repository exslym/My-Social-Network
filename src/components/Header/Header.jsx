// @ts-nocheck
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo-black.png';
import avatar from '../../assets/avatar.png';
import logout from '../../assets/logout.svg';
import styles from './Header.module.scss';

const Header = props => {
	return (
		<header className={styles.header}>
			<img className={styles.header_logo} src={logo} alt='logo' />
			{/* <div className={styles.header_loginBlock}>
				<NavLink to={'/profile'}>
					<img className={styles.avatar} src={avatar} alt='avatar' />
				</NavLink>
				{props.isAuth ? (
					<NavLink to={'/profile'}>
						<div className={styles.header_loginTrue}>
							{props.login}
							<img onClick={props.logout} className={styles.logout} src={logout} alt='logout' />
						</div>
					</NavLink>
				) : (
					<NavLink to={'/login'}>Login</NavLink>
				)}
			</div> */}
			{props.isAuth ? (
				<div className={styles.header_loginBlock}>
					<NavLink to={'/profile'}>
						<img className={styles.avatar} src={avatar} alt='avatar' />
						<div className={styles.header_loginTrue}>
							{props.login}
							<img onClick={props.logout} className={styles.logout} src={logout} alt='logout' />
						</div>
					</NavLink>
				</div>
			) : (
				<div className={styles.header_loginBlock}>
					<NavLink to={'/login'}>Login</NavLink>
				</div>
			)}
		</header>
	);
};

export default Header;
