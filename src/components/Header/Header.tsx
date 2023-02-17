import React from 'react';
import { NavLink } from 'react-router-dom';
import avatar from '../../assets/avatar.png';
import logo from '../../assets/logo-black.png';
import logout from '../../assets/logout.svg';
import styles from '../../Styles.module.scss';
// import styles from './Header.module.scss';

//* TYPES:
export type MapStatePropsType = {
	isAuth: boolean;
	login: string | null;
};
export type DispatchPropsType = {
	logout: () => void;
};

const Header: React.FC<MapStatePropsType & DispatchPropsType> = props => {
	return (
		<header className={styles.Header}>
			<img className={styles.Header_logo} src={logo} alt='logo' />
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
				<div className={styles.Header_loginBlock}>
					<NavLink to={'/profile'}>
						<img className={styles.Header_avatar} src={avatar} alt='avatar' />
						<div className={styles.Header_loginTrue}>
							{props.login}
							<img
								onClick={props.logout}
								className={styles.Header_logout}
								src={logout}
								alt='logout'
							/>
						</div>
					</NavLink>
				</div>
			) : (
				<div className={styles.Header_loginBlock}>
					<NavLink to={'/login'}>Login</NavLink>
				</div>
			)}
		</header>
	);
};

export default Header;
