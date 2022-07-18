import type { PostType, PhotosType, ProfileType } from './../types/types';
import { stopSubmit } from 'redux-form';
import { profileAPI, usersAPI } from '../api/api';

const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
	posts: [
		{ id: 1, post: 'My first post', likesCount: 25 },
		{ id: 2, post: 'My second post', likesCount: 18 },
		{ id: 3, post: 'My third post', likesCount: 6 },
	] as Array<PostType>,
	profile: null as ProfileType | null,
	status: '',
	newPostText: '',
};

export type initialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): initialStateType => {
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
		// 		posts: state.posts.filter(post => {
		// 			post.id !== action.postId;
		// 		}),
		// 	};

		case SET_USER_PROFILE: {
			return { ...state, profile: action.profile };
		}

		case SET_USER_STATUS: {
			return { ...state, status: action.status };
		}

		case SAVE_PHOTO_SUCCESS: {
			return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType };
		}

		default:
			return state;
	}
};

// ACTION_CREATORS:
//type
type AddPostActionCreatorActionType = {
	type: typeof ADD_POST;
	newPostText: string;
};
type SetUserProfileActionType = {
	type: typeof SET_USER_PROFILE;
	profile: ProfileType;
};
type SetUserStatusActionType = {
	type: typeof SET_USER_STATUS;
	status: string;
};
type DeletePostActionType = {
	type: typeof DELETE_POST;
	postId: number;
};
type SavePhotoSuccessActionType = {
	type: typeof SAVE_PHOTO_SUCCESS;
	photos: PhotosType;
};

export const addPostActionCreator = (newPostText: string): AddPostActionCreatorActionType => ({
	type: ADD_POST,
	newPostText,
});
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({
	type: SET_USER_PROFILE,
	profile,
});
export const setUserStatus = (status: string): SetUserStatusActionType => ({
	type: SET_USER_STATUS,
	status,
});
export const deletePost = (postId: number): DeletePostActionType => ({ type: DELETE_POST, postId });
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({
	type: SAVE_PHOTO_SUCCESS,
	photos,
});

// THUNKS:
//type

/* export const getUserProfile = userId => dispatch => {
	usersAPI.getProfile(userId).then(response => {
		dispatch(setUserProfile(response.data));
	});
}; */
//refactored:
export const getUserProfile = (userId: number) => async (dispatch: any) => {
	const response = await usersAPI.getProfile(userId);
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
export const getUserStatus = (userId: number) => async (dispatch: any) => {
	const response = await profileAPI.getStatus(userId);
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
export const updateUserStatus = (status: string) => async (dispatch: any) => {
	const response = await profileAPI.updateStatus(status);
	if (response.data.resultCode === 0) {
		dispatch(setUserStatus(status));
	}
};

export const savePhoto = (file: any) => async (dispatch: any) => {
	const response = await profileAPI.savePhoto(file);
	if (response.data.resultCode === 0) {
		dispatch(savePhotoSuccess(response.data.data.photos));
	}
};

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
	const userId = getState().auth.userId;
	const response = await profileAPI.saveProfile(profile);
	if (response.data.resultCode === 0) {
		dispatch(getUserProfile(userId));
	} else {
		/* 		dispatch(stopSubmit('edit-profile', { _error: response.data.messages[0] }));
		return Promise.reject(response.data.messages[0]); */
		/* 		let wrongNetwork = response.data.messages[0]
			.slice(response.data.messages[0].indexOf('>') + 1, response.data.messages[0].indexOf(')'))
			.toLocaleLowerCase();
		dispatch(
			stopSubmit('edit-profile', {
				contacts: { [wrongNetwork]: response.data.messages[0] },
			}),
		);
		return Promise.reject(response.data.messages[0]); */
		let error = response.data.messages[0];
		let errorObj = { _error: error } as any;
		let match = error.match(/Invalid url format \(Contacts->(.+)\)/);
		if (match) {
			let fieldName = match[1].toLowerCase();
			errorObj = { contacts: {} };
			errorObj.contacts[fieldName] = error;
		}
		dispatch(stopSubmit('edit-profile', errorObj));
		throw error;
	}
};

export default profileReducer;
