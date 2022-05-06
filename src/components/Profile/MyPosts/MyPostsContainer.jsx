// import React from 'react';
import MyPosts from './MyPosts';
import { addPostCreator, updateNewPostTextCreator } from '../../../redux/profile-reducer';
import { connect } from 'react-redux';

const mapStateToProps = state => {
	return {
		posts: state.profilePage.posts,
		newPostText: state.profilePage.newPostText,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		updateNewPostText: text => {
			let action = updateNewPostTextCreator(text);
			dispatch(action);
		},
		addPost: () => {
			dispatch(addPostCreator());
		},
	};
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
