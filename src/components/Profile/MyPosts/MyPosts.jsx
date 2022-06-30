// @ts-nocheck
import React, { memo } from 'react';
import Post from './Post/Post';
import styles from './MyPosts.module.scss';
import { AddNewPostReduxForm } from './AddPostForm/AddPostForm';

const MyPosts = memo(props => {
	let postElements = [...props.posts]
		.reverse()
		.map(p => <Post message={p.post} count={p.likesCount} key={p.id} />);

	let onAddPostClick = values => {
		props.addPost(values.newPostText);
	};

	return (
		<>
			<p className={styles.title}>My posts</p>
			<AddNewPostReduxForm onSubmit={onAddPostClick} />
			<div className={styles.posts}>{postElements}</div>
		</>
	);
});

export default MyPosts;
