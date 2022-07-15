// import { createReducer } from '@reduxjs/toolkit';
import { stopSubmit } from 'redux-form';
import { authAPI, securityAPI } from '../api/api';

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

let initialState = {
	userId: null,
	email: null,
	login: null,
	isAuth: false,
	captchaUrl: null, // if null then captcha is not required
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
		case GET_CAPTCHA_URL_SUCCESS:
			return {
				...state,
				...action.payload,
			};

		default:
			return state;
	}
};

// ACTION_CREATORS:
export const setAuthUserData = (userId, email, login, isAuth) => ({
	type: SET_USER_DATA,
	payload: { userId, email, login, isAuth },
});

export const getCaptchaUrlSuccess = captchaUrl => ({
	type: GET_CAPTCHA_URL_SUCCESS,
	payload: { captchaUrl },
});

//THUNKS:
/* export const getAuthUserData = () => dispatch => {
	return authAPI.me().then(response => {
		if (response.data.resultCode === 0) {
			let { id, email, login } = response.data.data;
			dispatch(setAuthUserData(id, email, login, true));
		}
	});
}; */
//refactored:
export const getAuthUserData = () => async dispatch => {
	const response = await authAPI.me();
	if (response.data.resultCode === 0) {
		let { id, email, login } = response.data.data;
		dispatch(setAuthUserData(id, email, login, true));
	}
};

/* export const login = (email, password, rememberMe) => dispatch => {
	authAPI.login(email, password, rememberMe).then(response => {
		if (response.data.resultCode === 0) {
			dispatch(getAuthUserData());
		} else {
			let message =
				response.data.messages.length > 0 ? response.data.messages[0] : 'undefined error';
			dispatch(stopSubmit('login', { _error: message }));
		}
	});
}; */
//refactored:
export const login = (email, password, rememberMe, captcha) => async dispatch => {
	const response = await authAPI.login(email, password, rememberMe, captcha);
	if (response.data.resultCode === 0) {
		// success, get auth data
		dispatch(getAuthUserData());
	} else {
		if (response.data.resultCode === 10) {
			dispatch(getCaptchaUrl());
		}
		let message = response.data.messages.length > 0 ? response.data.messages[0] : 'undefined error';
		dispatch(stopSubmit('login', { _error: message }));
	}
};

export const getCaptchaUrl = () => async dispatch => {
	const response = await securityAPI.getCaptchaUrl();
	const captchaUrl = response.data.url;
	dispatch(getCaptchaUrlSuccess(captchaUrl));
};

/* export const logout = () => dispatch => {
	authAPI.logout().then(response => {
		if (response.data.resultCode === 0) {
			dispatch(setAuthUserData(null, null, null, false));
		}
	});
}; */
//refactored:
export const logout = () => async dispatch => {
	const response = await authAPI.logout();
	if (response.data.resultCode === 0) {
		dispatch(setAuthUserData(null, null, null, false));
	}
};

export default authReducer;
