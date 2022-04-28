import React from 'react';
import Post from './Post/Post';
import styles from './MyPosts.module.css';

const MyPosts = props => {
	let postElements = props.posts.map(p => <Post message={p.post} count={p.likesCount} />);

	return (
		<div>
			<p className={styles.title}>My posts</p>
			<div>
				<textarea className={styles.textarea} name='addtext' id='addpost'></textarea>
				<button className={styles.button}>Add post</button>
			</div>
			<div className={styles.posts}>{postElements}</div>
		</div>
	);
};

export default MyPosts;
