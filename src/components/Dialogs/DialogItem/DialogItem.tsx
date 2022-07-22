import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './DialogItem.module.scss';

//* TYPES:
type PropsType = {
	avatar: string | null;
	name: string;
	id: number;
};

const DialogItem: React.FC<PropsType> = props => {
	let path = `/dialogs/${props.id}`;
	let avatarSrc = require(`../../../assets/${props.avatar}`);

	return (
		<div className={styles.app_dialogs_item}>
			<NavLink to={path} className={({ isActive }) => (isActive ? styles.active : undefined)}>
				<img className={styles.app_dialogs_avatar} src={avatarSrc} alt='avatar'></img>
				<p className={styles.app_dialogs_name}>{props.name}</p>
			</NavLink>
		</div>
	);
};

export default DialogItem;
