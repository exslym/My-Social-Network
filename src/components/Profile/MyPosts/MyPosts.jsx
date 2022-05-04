import React from 'react';
import Post from './Post/Post';
import styles from './MyPosts.module.css';

const MyPosts = props => {
	let postElements = props.posts.map(p => (
		<Post message={p.post} count={p.likesCount} key={p.id} />
	));

	let newPostElement = React.createRef();

	let addPost = () => {
		let text = newPostElement.current.value;
		props.addPost(text);
	};

	let onPostChange = () => {
		let text = newPostElement.current.value;
		props.updateNewPostText(text);
	};

	return (
		<div>
			<p className={styles.title}>My posts</p>
			<div>
				<textarea
					onChange={onPostChange}
					ref={newPostElement}
					value={props.newPostText}
					className={styles.textarea}
				/>
				<button onClick={addPost} className={styles.button}>
					Add post
				</button>
			</div>
			<div className={styles.posts}>{postElements}</div>
		</div>
	);
};

export default MyPosts;
