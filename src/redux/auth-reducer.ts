import { useDispatch } from 'react-redux';
import { FormAction, stopSubmit } from 'redux-form';
import { ThunkDispatch } from 'redux-thunk';
import { ResultCodesEnum, ResultCodesForCaptchaEnum } from '../api/api';
import { authAPI } from '../api/auth-api';
import { securityAPI } from '../api/security-api';
import type { AppStateGlobalType, BaseThunkType, InferActionsTypes } from './redux-store';

//* TYPES:
export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | FormAction>;

//* Typed DISPATCH:
export type TypedDispatch = ThunkDispatch<AppStateGlobalType, any, ActionsTypes>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();

let initialState = {
	userId: null as number | null,
	email: null as string | null,
	login: null as string | null,
	isAuth: false,
	captchaUrl: null as string | null, // if null then captcha is not required
};

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case 'SN/AUTH/SET_USER_DATA':
		case 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS':
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};

//* ACTION_CREATORS:
export const actions = {
	setAuthUserData: (
		userId: number | null,
		email: string | null,
		login: string | null,
		isAuth: boolean,
	) => ({ type: 'SN/AUTH/SET_USER_DATA', payload: { userId, email, login, isAuth } } as const),
	getCaptchaUrlSuccess: (captchaUrl: string) =>
		({ type: 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS', payload: { captchaUrl } } as const),
};

//* THUNKS:
export const getAuthUserData = (): ThunkType => async dispatch => {
	const meData = await authAPI.me();
	if (meData.resultCode === ResultCodesEnum.Success) {
		let { id, email, login } = meData.data;
		dispatch(actions.setAuthUserData(id, email, login, true));
	}
};

export const login =
	(email: string, password: string, rememberMe: boolean, captcha: string): ThunkType =>
	async dispatch => {
		const loginData = await authAPI.login(email, password, rememberMe, captcha);
		if (loginData.resultCode === ResultCodesEnum.Success) {
			// success, get auth data
			dispatch(getAuthUserData());
		} else {
			if (loginData.resultCode === ResultCodesForCaptchaEnum.CaptchaIsRequired) {
				dispatch(getCaptchaUrl());
			}
			let message = loginData.messages.length > 0 ? loginData.messages[0] : 'undefined error';
			dispatch(stopSubmit('login', { _error: message }));
		}
	};

export const getCaptchaUrl = (): ThunkType => async dispatch => {
	const loginData = await securityAPI.getCaptchaUrl();
	const captchaUrl = loginData.url;
	dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};

export const logout = (): ThunkType => async dispatch => {
	const logoutData = await authAPI.logout();
	if (logoutData.data.resultCode === ResultCodesEnum.Success) {
		dispatch(actions.setAuthUserData(null, null, null, false));
	}
};

export default authReducer;
