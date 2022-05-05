import React from 'react';
import styles from './SideBarItem.module.css';

const SideBarItem = props => {
	let avatarSrc = require(`../../Dialogs/assets/${props.avatar}`);

	return (
		<div className={styles.app_sideBar_item}>
			<img src={avatarSrc} alt='avatar' className={styles.app_sideBar_img} />
			<p className={styles.app_sideBar_name}>{props.name}</p>
		</div>
	);
};

export default SideBarItem;
