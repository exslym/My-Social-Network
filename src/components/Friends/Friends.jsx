import React from 'react';
import FriendsItem from './FriendsItem/FriendsItem';
import styles from './Friends.module.css';

const Friends = props => {
	let friendsElements = props.friends.map(f => (
		<FriendsItem avatar={f.avatar} name={f.name} id={f.id} key={f.id} />
	));

	return (
		<div className={styles.app_friends}>
			<p>Friends</p>

			<div className={styles.app_friends_items}>{friendsElements}</div>
		</div>
	);
};

export default Friends;
