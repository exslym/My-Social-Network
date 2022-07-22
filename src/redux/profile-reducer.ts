import type { PostType, PhotosType, ProfileType } from './../types/types';
import type { BaseThunkType, InferActionsTypes } from './redux-store';
import { FormAction, stopSubmit } from 'redux-form';
import { profileAPI } from '../api/profile-api';

//* TYPES:
export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | FormAction>;

let initialState = {
	posts: [
		{ id: 1, post: 'My first post', likesCount: 25 },
		{ id: 2, post: 'My second post', likesCount: 18 },
		{ id: 3, post: 'My third post', likesCount: 6 },
	] as Array<PostType>,
	profile: null as ProfileType | null,
	status: '',
	// newPostText: '',
};

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case 'SN/PROFILE/ADD_POST':
			let newPost = {
				id: 5,
				post: action.newPostText,
				likesCount: 0,
			};
			return { ...state, posts: [...state.posts, newPost] };
		case 'SN/PROFILE/DELETE_POST':
			return {
				...state,
				posts: state.posts.filter(post => post.id !== action.postId),
			};
		case 'SN/PROFILE/SET_USER_PROFILE': {
			return { ...state, profile: action.profile };
		}
		case 'SN/PROFILE/SET_USER_STATUS': {
			return { ...state, status: action.status };
		}
		case 'SN/PROFILE/SAVE_PHOTO_SUCCESS': {
			return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType };
		}
		default:
			return state;
	}
};

//* ACTION_CREATORS:
export const actions = {
	addPostActionCreator: (newPostText: string) =>
		({
			type: 'SN/PROFILE/ADD_POST',
			newPostText,
		} as const),
	setUserProfile: (profile: ProfileType) =>
		({
			type: 'SN/PROFILE/SET_USER_PROFILE',
			profile,
		} as const),
	setUserStatus: (status: string) =>
		({
			type: 'SN/PROFILE/SET_USER_STATUS',
			status,
		} as const),
	deletePost: (postId: number) => ({ type: 'SN/PROFILE/DELETE_POST', postId } as const),
	savePhotoSuccess: (photos: PhotosType) =>
		({
			type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS',
			photos,
		} as const),
};

//* THUNKS:
export const getUserProfile =
	(userId: number): ThunkType =>
	async dispatch => {
		const userData = await profileAPI.getProfile(userId);
		dispatch(actions.setUserProfile(userData));
	};

export const getUserStatus =
	(userId: number): ThunkType =>
	async dispatch => {
		const userData = await profileAPI.getStatus(userId);
		dispatch(actions.setUserStatus(userData));
	};

export const updateUserStatus =
	(status: string): ThunkType =>
	async dispatch => {
		const userData = await profileAPI.updateStatus(status);
		if (userData.resultCode === 0) {
			dispatch(actions.setUserStatus(status));
		}
	};

export const savePhoto =
	(imageFile: File): ThunkType =>
	async dispatch => {
		const userData = await profileAPI.savePhoto(imageFile);
		if (userData.resultCode === 0) {
			dispatch(actions.savePhotoSuccess(userData.data.photos));
		}
	};

export const saveProfile =
	(profile: ProfileType): ThunkType =>
	async (dispatch, getState) => {
		const userId = getState().auth.userId;
		const userData = await profileAPI.saveProfile(profile);
		if (userData.resultCode === 0) {
			if (userId !== null) {
				dispatch(getUserProfile(userId));
			} else {
				throw new Error("userId can't be null");
			}
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
			let error = userData.messages[0];
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
