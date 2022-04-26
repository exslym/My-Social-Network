import React from 'react';
import Post from './Post/Post';
import styles from './MyPosts.module.css';

const MyPosts = () => {
	return (
		<div>
			<p className={styles.title}>My posts</p>
			<div>
				<textarea className={styles.textarea} name='addtext' id='addpost'></textarea>
				<button className={styles.button}>Add post</button>
			</div>
			<div className={styles.posts}>
				<Post message='Hey, how r u doin?' count='5' />
				<Post message='My first post' count='10' />
				<Post message='My second post' count='25' />
			</div>
		</div>
	);
};

export default MyPosts;
