import React from 'react';
import FriendsItem from '../Friends/FriendsItem/FriendsItem';
import styles from './SideBar.module.css';

const SideBar = props => {
	let friendsElements = props.friends.map(f => (
		<FriendsItem avatar={f.avatar} name={f.name} id={f.id} />
	));

	return (
		<div className={styles.sideBar}>
			<p>Friends</p>

			<div className={styles.sideBar_items}>{friendsElements}</div>
		</div>
	);
};

export default SideBar;
