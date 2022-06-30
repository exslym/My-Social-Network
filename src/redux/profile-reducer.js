import { profileAPI, usersAPI } from '../api/api';

const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';

let initialState = {
	posts: [
		{ id: 1, post: 'My first post', likesCount: 25 },
		{ id: 2, post: 'My second post', likesCount: 18 },
		{ id: 3, post: 'My third post', likesCount: 6 },
	],
	profile: null,
	status: '',
};

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST:
			let newPost = {
				id: 5,
				post: action.newPostText,
				likesCount: 0,
			};
			return { ...state, newPostText: '', posts: [...state.posts, newPost] };

		// case DELETE_POST:
		// 	return {
		// 		...state,
		// 		posts: state.posts.filter(p => {
		// 			p.id !== action.postId;
		// 		}),
		// 	};

		case SET_USER_PROFILE: {
			return { ...state, profile: action.profile };
		}

		case SET_USER_STATUS: {
			return { ...state, status: action.status };
		}

		default:
			return state;
	}
};

// ACTION_CREATORS:
export const addPostActionCreator = newPostText => ({ type: ADD_POST, newPostText });
export const setUserProfile = profile => ({ type: SET_USER_PROFILE, profile });
export const setUserStatus = status => ({ type: SET_USER_STATUS, status });
export const deletePost = postId => ({ type: DELETE_POST, postId });

// THUNKS:
/* export const getUserProfile = userId => dispatch => {
	usersAPI.getProfile(userId).then(response => {
		dispatch(setUserProfile(response.data));
	});
}; */
//refactored:
export const getUserProfile = userId => async dispatch => {
	let response = await usersAPI.getProfile(userId);
	dispatch(setUserProfile(response.data));
};

/* export const getUserStatus = userId => dispatch => {
	profileAPI.getStatus(userId).then(response => {
		// if (response.data === null) {
		// 	return;
		// }
		dispatch(setUserStatus(response.data));
	});
}; */
//refactored:
export const getUserStatus = userId => async dispatch => {
	let response = await profileAPI.getStatus(userId);
	dispatch(setUserStatus(response.data));
};

/* export const updateUserStatus = status => dispatch => {
	profileAPI.updateStatus(status).then(response => {
		if (response.data.resultCode === 0) {
			dispatch(setUserStatus(status));
		}
	});
}; */
//refactored:
export const updateUserStatus = status => async dispatch => {
	let response = await profileAPI.updateStatus(status);
	if (response.data.resultCode === 0) {
		dispatch(setUserStatus(status));
	}
};

export default profileReducer;
