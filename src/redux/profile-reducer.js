import { profileAPI, usersAPI } from '../api/api';

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';

let initialState = {
	posts: [
		{ id: 1, post: 'Hey, how r u doin?', likesCount: 5 },
		{ id: 2, post: 'My first post', likesCount: 10 },
		{ id: 3, post: 'My second post', likesCount: 25 },
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

// THUNKS:
export const getUserProfile = userId => dispatch => {
	usersAPI.getProfile(userId).then(response => {
		dispatch(setUserProfile(response.data));
	});
};
export const getUserStatus = userId => dispatch => {
	profileAPI.getStatus(userId).then(response => {
		// if (response.data === null) {
		// 	return;
		// }

		dispatch(setUserStatus(response.data));
	});
};
export const updateUserStatus = status => dispatch => {
	profileAPI.updateStatus(status).then(response => {
		if (response.data.resultCode === 0) {
			dispatch(setUserStatus(status));
		}
	});
};

export default profileReducer;
