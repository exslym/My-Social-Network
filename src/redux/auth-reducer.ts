// import { createReducer } from '@reduxjs/toolkit';
import { stopSubmit } from 'redux-form';
import { authAPI, ResultCodesEnum, ResultCodesForCaptcha, securityAPI } from '../api/api';

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

let initialState = {
	userId: null as number | null,
	email: null as string | null,
	login: null as string | null,
	isAuth: false,
	captchaUrl: null as string | null, // if null then captcha is not required
};

const authReducer = (state = initialState, action: any): InitialStateType => {
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

//* TYPES:
export type InitialStateType = typeof initialState;
// type ActionTypes = setAuthUserDataActionPayloadType | setAuthUserDataActionType;
type setAuthUserDataActionPayloadType = {
	userId: number | null;
	email: string | null;
	login: string | null;
	isAuth: boolean;
};
type setAuthUserDataActionType = {
	type: typeof SET_USER_DATA;
	payload: setAuthUserDataActionPayloadType;
};
type getCaptchaUrlSuccessActionType = {
	type: typeof GET_CAPTCHA_URL_SUCCESS;
	payload: { captchaUrl: string };
};

//* ACTION_CREATORS:
export const setAuthUserData = (
	userId: number | null,
	email: string | null,
	login: string | null,
	isAuth: boolean,
): setAuthUserDataActionType => ({
	type: SET_USER_DATA,
	payload: { userId, email, login, isAuth },
});
export const getCaptchaUrlSuccess = (captchaUrl: string): getCaptchaUrlSuccessActionType => ({
	type: GET_CAPTCHA_URL_SUCCESS,
	payload: { captchaUrl },
});

//* THUNKS:
/* export const getAuthUserData = () => dispatch => {
	return authAPI.me().then(response => {
		if (response.data.resultCode === 0) {
			let { id, email, login } = response.data.data;
			dispatch(setAuthUserData(id, email, login, true));
		}
	});
}; */
//* refactored:
export const getAuthUserData = () => async (dispatch: any) => {
	const meData = await authAPI.me();

	if (meData.resultCode === ResultCodesEnum.Success) {
		let { id, email, login } = meData.data;
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
//* refactored:
export const login =
	(email: string, password: string, rememberMe: boolean, captcha: string) =>
	async (dispatch: any) => {
		const loginData = await authAPI.login(email, password, rememberMe, captcha);
		if (loginData.resultCode === ResultCodesEnum.Success) {
			// success, get auth data
			dispatch(getAuthUserData());
		} else {
			if (loginData.resultCode === ResultCodesForCaptcha.CaptchaIsRequired) {
				dispatch(getCaptchaUrl());
			}
			let message = loginData.messages.length > 0 ? loginData.messages[0] : 'undefined error';
			dispatch(stopSubmit('login', { _error: message }));
		}
	};

export const getCaptchaUrl = () => async (dispatch: any) => {
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
//* refactored:
export const logout = () => async (dispatch: any) => {
	const response = await authAPI.logout();
	if (response.data.resultCode === ResultCodesEnum.Success) {
		dispatch(setAuthUserData(null, null, null, false));
	}
};

export default authReducer;
