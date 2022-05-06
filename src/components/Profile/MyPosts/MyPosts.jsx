import React from 'react';
import Post from './Post/Post';
import styles from './MyPosts.module.css';

const MyPosts = props => {
	let postElements = props.posts.map(p => (
		<Post message={p.post} count={p.likesCount} key={p.id} />
	));

	// let onNewPostChange = e => {
	// 	let text = e.target.value;
	// 	props.store.dispatch(updateNewPostTextCreator(text));
	// };
	// let onAddPostClick = () => {
	// 	props.store.dispatch(addPostCreator());
	// };

	let newPostElement = React.createRef();

	let onAddPostClick = () => {
		props.addPost();
		// let text = newPostElement.current.value;
		// props.dispatch(addPostCreator());
	};

	let onPostChange = () => {
		let text = newPostElement.current.value;
		props.updateNewPostText(text);
		// let action = { type: 'UPDATE-NEW-POST-TEXT', newText: text };
		// props.updateNewPostText(text);
		// let action = updateNewPostTextCreator(text);
		// props.dispatch(action);
	};

	return (
		<div>
			<p className={styles.title}>My posts</p>
			<div>
				<textarea
					// value={newPostElement}
					// onChange={onNewPostChange}
					// placeholder='Enter your message'
					onChange={onPostChange}
					ref={newPostElement}
					value={props.newPostText}
					// className={styles.textarea}
				/>
				<button
					// onClick={onAddPostClick}
					onClick={onAddPostClick}
					className={styles.button}
				>
					Add post
				</button>
			</div>
			<div className={styles.posts}>{postElements}</div>
		</div>
	);
};

export default MyPosts;
