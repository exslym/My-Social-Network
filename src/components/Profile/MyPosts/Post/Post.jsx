import React from 'react';
import avatar from './assets/avatar.png';
import likes from './assets/likes.svg';
import styles from './Post.module.css';

const Post = props => {
	return (
		<div className={styles.item}>
			<div className={styles.post_wrap}>
				<img className={styles.avatar} src={avatar} alt='avatar' />
				<p>{props.message}</p>
			</div>
			<div className={styles.likes}>
				<img src={likes} alt='likes' />
				<span>{props.count}</span>
			</div>
		</div>
	);
};

export default Post;
