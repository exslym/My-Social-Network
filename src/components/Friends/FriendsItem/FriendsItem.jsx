import React from 'react';
import styles from './FriendsItem.module.css';

const FriendsItem = props => {
	return (
		<div className={styles.app_friends_item}>
			<p className={styles.app_friends_name}>{props.name}</p>
		</div>
	);
};

export default FriendsItem;
