import React from 'react';
import Post from './Post/Post';
import styles from './MyPosts.module.scss';
import AddNewPostForm from './AddPostForm/AddPostForm';
import type { AddPostFormValuesType } from './AddPostForm/AddPostForm';
import type { PostType } from '../../../types/types';

//* TYPES:
export type MapPropsType = {
	posts: Array<PostType>;
};
export type DispatchPropsType = {
	addPost: (newPostText: string) => void;
};

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = props => {
	let postElements = [...props.posts]
		.reverse()
		.map(p => <Post message={p.post} count={p.likesCount} key={p.id} />);

	let onAddPostClick = (values: AddPostFormValuesType) => {
		props.addPost(values.newPostText);
	};

	return (
		<>
			<p className={styles.title}>My posts</p>
			<AddNewPostForm onSubmit={onAddPostClick} />
			<div className={styles.posts}>{postElements}</div>
		</>
	);
};

// const MyPostsMemo = React.memo(MyPosts);
// export default MyPostsMemo;

export default React.memo(MyPosts);
