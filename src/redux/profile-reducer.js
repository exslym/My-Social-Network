import { createAction, createReducer } from '@reduxjs/toolkit';

const ADD_POST = createAction('ADD_POST');
const UPDATE_NEW_POST_TEXT = createAction('UPDATE_NEW_POST_TEXT');

// const ADD_POST = 'ADD_POST';
// const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';

let initialState = {
	posts: [
		{ id: 1, post: 'Hey, how r u doin?', likesCount: 5 },
		{ id: 2, post: 'My first post', likesCount: 10 },
		{ id: 3, post: 'My second post', likesCount: 25 },
	],
	newPostText: '',
};

const profileReducer = createReducer(initialState, builder => {
	builder
		.addCase(ADD_POST, (state, action) => {
			let newPost = {
				id: 5,
				post: state.newPostText,
				likesCount: 0,
			};
			state.posts.push(newPost);
			state.newPostText = '';
			return state;
		})
		.addCase(UPDATE_NEW_POST_TEXT, (state, action) => {
			state.newPostText = action.newText;
			return state;
		})
		.addDefaultCase((state, action) => {
			return state;
		});
});

// const profileReducer = (state = initialState, action) => {
// 	switch (action.type) {
// 		case ADD_POST:
// 			let newPost = {
// 				id: 5,
// 				post: state.newPostText,
// 				likesCount: 0,
// 			};
// 			state.posts.push(newPost);
// 			state.newPostText = '';
// 			return state;
// 		case UPDATE_NEW_POST_TEXT:
// 			state.newPostText = action.newText;
// 			return state;
// 		default:
// 			return state;
// 	}
// };

// ActionCreator:
export const addPostCreator = () => ({ type: 'ADD_POST' });
export const updateNewPostTextCreator = text => ({
	type: 'UPDATE_NEW_POST_TEXT',
	newText: text,
});
// export const addPostCreator = () => ({ type: ADD_POST });
// export const updateNewPostTextCreator = text => ({
// 	type: UPDATE_NEW_POST_TEXT,
// 	newText: text,
// });

export default profileReducer;
