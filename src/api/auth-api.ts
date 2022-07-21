import { instance, ResultCodesEnum, ResultCodesForCaptchaEnum } from './api';
import type { APIResponseType } from './api';

//* TYPES:
type MeResponseDataType = {
	id: number;
	email: string;
	login: string;
};
type LoginResponseDataType = {
	userId: number;
};

export const authAPI = {
	/* 	me() {
		return instance.get<MeAPIResponseType>(`auth/me`).then(res => res.data);
	}, */
	//* refactored
	async me() {
		const res = await instance.get<APIResponseType<MeResponseDataType>>(`auth/me`);
		return res.data;
	},
	/* 	login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
		return instance
			.post<LoginAPIResponseType>(`auth/login`, { email, password, rememberMe, captcha })
			.then(res => res.data);
	}, */
	//* refactored
	async login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
		const res = await instance.post<
			APIResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodesForCaptchaEnum>
		>(`auth/login`, {
			email,
			password,
			rememberMe,
			captcha,
		});
		return res.data;
	},
	logout() {
		return instance.delete(`auth/login`);
	},
};
