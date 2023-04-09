import React from 'react';
import likes from '../../../../assets/icon_liked.svg';
import avatar from '../../../../assets/logo_rgb.png';
import styles from './Post.module.scss';

//* TYPES:
type PropsType = {
	message: string;
	count: number | null;
};

const Post: React.FC<PropsType> = props => {
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
