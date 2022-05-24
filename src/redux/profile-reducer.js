// import { createAction, createReducer } from '@reduxjs/toolkit';
// const ADD_POST = createAction('ADD_POST');
// const UPDATE_NEW_POST_TEXT = createAction('UPDATE_NEW_POST_TEXT');

import { usersAPI } from '../api/api';

const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

let initialState = {
	posts: [
		{ id: 1, post: 'Hey, how r u doin?', likesCount: 5 },
		{ id: 2, post: 'My first post', likesCount: 10 },
		{ id: 3, post: 'My second post', likesCount: 25 },
	],
	newPostText: '',
	profile: null,
};

// const profileReducer = createReducer(initialState, builder => {
// 	let stateCopy;

// 	builder
// 		.addCase(ADD_POST, (state, action) => {
// 			let newPost = {
// 				id: 5,
// 				post: state.newPostText,
// 				likesCount: 0,
// 			};
// 			stateCopy = { ...state };
// 			stateCopy.posts = [...state.posts];
// 			stateCopy.posts.push(newPost);
// 			stateCopy.newPostText = '';
// 			return stateCopy;
// 		})
// 		.addCase(UPDATE_NEW_POST_TEXT, (state, action) => {
// 			stateCopy = { ...state };
// 			stateCopy.posts = [...state.posts];
// 			stateCopy.newPostText = action.newText;
// 			return stateCopy;
// 		})
// 		.addDefaultCase((state, action) => {
// 			return state;
// 		});
// });

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_NEW_POST_TEXT:
			return { ...state, newPostText: action.newText };

		case ADD_POST:
			let newPost = {
				id: 5,
				post: state.newPostText,
				likesCount: 0,
			};
			return { ...state, newPostText: '', posts: [...state.posts, newPost] };

		case SET_USER_PROFILE: {
			return { ...state, profile: action.profile };
		}

		default:
			return state;
	}
};

// ACTION_CREATORS:
export const addPostActionCreator = () => ({ type: ADD_POST });
export const updateNewPostTextActionCreator = text => ({
	type: UPDATE_NEW_POST_TEXT,
	newText: text,
});
export const setUserProfile = profile => ({ type: SET_USER_PROFILE, profile });

// export const addPostCreator = () => ({ type: 'ADD_POST' });
// export const updateNewPostTextCreator = text => ({
// 	type: 'UPDATE_NEW_POST_TEXT',
// 	newText: text,
// });

// THUNKS:
export const getUserProfile = userId => dispatch => {
	usersAPI.getProfile(userId).then(response => {
		dispatch(setUserProfile(response.data));
	});
};

export default profileReducer;
