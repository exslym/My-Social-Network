// @ts-nocheck
import React from 'react';
import Post from './Post/Post';
import styles from './MyPosts.module.css';

const MyPosts = props => {
	let postElements = props.posts.map(p => (
		<Post message={p.post} count={p.likesCount} key={p.id} />
	));

	// let newPostElement = props.newPostElement;

	// let onNewPostChange = e => {
	// 	let text = e.target.value;
	// 	props.updateNewPostText(text);
	// };
	// let onAddPostClick = () => {
	// 	props.addPost();
	// };

	let newPostElement = React.createRef();

	let onNewPostChange = () => {
		let text = newPostElement.current.value;
		props.updateNewPostText(text);
	};
	let onAddPostClick = () => {
		props.addPost();
	};

	return (
		<div>
			<p className={styles.title}>My posts</p>
			<div>
				<textarea
					// value={newPostElement}
					onChange={onNewPostChange}
					placeholder='Enter your message'
					ref={newPostElement}
					value={props.newPostText}
					className={styles.textarea}
				/>
				<button onClick={onAddPostClick} className={styles.button}>
					Add post
				</button>
			</div>
			<div className={styles.posts}>{postElements}</div>
		</div>
	);
};

export default MyPosts;
