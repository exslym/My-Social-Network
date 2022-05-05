import React from 'react';
import SideBarItem from './SideBarItem/SideBarItem';
import styles from './SideBar.module.css';

const SideBar = props => {
	let friendsElements = props.friends.map(f => (
		<SideBarItem
			avatar={f.avatar}
			name={f.name}
			id={f.id}
			key={f.id}
			className={styles.app_sideBar_item}
		/>
	));

	return (
		<div className={styles.app_sideBar}>
			<p>Friends</p>

			<div className={styles.app_sideBar_items}>{friendsElements}</div>
		</div>
	);
};

export default SideBar;
