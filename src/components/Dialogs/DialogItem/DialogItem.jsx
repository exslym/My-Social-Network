import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './DialogItem.module.css';

const DialogItem = props => {
	let path = `/dialogs/${props.id}`;

	return (
		<div className={styles.app_dialogs_item}>
			<NavLink to={path} className={({ isActive }) => (isActive ? styles.active : undefined)}>
				{props.name}
			</NavLink>
		</div>
	);
};

export default DialogItem;
