import React from 'react';
import MyPosts from './MyPosts';
import { addPostCreator, updateNewPostTextCreator } from '../../../redux/profile-reducer';

const MyPostsContainer = props => {
	let profilePage = props.store.getState().profilePage;

	let addPost = () => {
		props.store.dispatch(addPostCreator());
	};

	let onPostChange = text => {
		let action = updateNewPostTextCreator(text);
		props.store.dispatch(action);
	};

	return (
		<MyPosts
			updateNewPostText={onPostChange}
			addPost={addPost}
			posts={profilePage.posts}
			newPostText={profilePage.newPostText}
		/>
	);
};

export default MyPostsContainer;
