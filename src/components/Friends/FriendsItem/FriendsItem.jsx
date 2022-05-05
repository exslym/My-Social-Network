import React from 'react';
import styles from './FriendsItem.module.css';

const FriendsItem = props => {
	let avatarSrc = require(`../../Dialogs/assets/${props.avatar}`);

	return (
		<div className={styles.app_friends_item}>
			<img src={avatarSrc} alt='avatar' className={styles.app_friends_img} />
			<p className={styles.app_friends_name}>{props.name}</p>
		</div>
	);
};

export default FriendsItem;
