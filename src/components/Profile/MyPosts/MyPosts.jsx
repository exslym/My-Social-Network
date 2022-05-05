import React from 'react';
import Post from './Post/Post';
import styles from './MyPosts.module.css';
import { addPostCreator, updateNewPostTextCreator } from '../../../redux/profile-reducer';

const MyPosts = props => {
	let postElements = props.posts.map(p => (
		<Post message={p.post} count={p.likesCount} key={p.id} />
	));

	let newPostElement = React.createRef();

	let addPost = () => {
		// let text = newPostElement.current.value;
		// props.addPost(text);
		props.dispatch(addPostCreator());
	};

	let onPostChange = () => {
		let text = newPostElement.current.value;
		// let action = { type: 'UPDATE-NEW-POST-TEXT', newText: text };
		// props.updateNewPostText(text);
		let action = updateNewPostTextCreator(text);
		props.dispatch(action);
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
