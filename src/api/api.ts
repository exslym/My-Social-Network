import axios from 'axios';
import type { ProfileType } from '../types/types';

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: { 'API-KEY': '254005db-0ca0-46a6-8acf-d019e2f14645' },
});

export const usersAPI = {
	/* requestUsers(currentPage = 1, pageSize = 10) {
		return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => {
			return response.data;
		});
	}, */
	//* refactored
	async requestUsers(currentPage = 1, pageSize = 10) {
		const response = await instance.get(`users?page=${currentPage}&count=${pageSize}`);
		return response.data;
	},
	follow(userId: number) {
		return instance.post(`follow/${userId}`);
	},
	unfollow(userId: number) {
		return instance.delete(`follow/${userId}`);
	},
	getProfile(userId: number) {
		console.log('Obsolete method. Please use profileAPI object');
		return profileAPI.getProfile(userId);
	},
};

export const profileAPI = {
	getProfile(userId: number) {
		return instance.get(`profile/${userId}`);
	},
	getStatus(userId: number) {
		return instance.get(`profile/status/${userId}`);
	},
	updateStatus(status: string) {
		return instance.put(`profile/status`, { status: status });
	},
	savePhoto(photoFile: any) {
		const formData = new FormData();
		formData.append('image', photoFile);
		return instance.put(`profile/photo`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	},
	saveProfile(profile: ProfileType) {
		return instance.put(`profile`, profile);
	},
};

//* ENUMS:
export enum ResultCodesEnum {
	Success = 0,
	Error = 1,
}
export enum ResultCodesForCaptcha {
	CaptchaIsRequired = 10,
}

//* TYPES:
type MeResponseType = {
	data: {
		id: number;
		email: string;
		login: string;
	};
	resultCode: ResultCodesEnum;
	messages: Array<string>;
};
type LoginResponseType = {
	data: {
		userId: number;
	};
	resultCode: ResultCodesEnum | ResultCodesForCaptcha;
	messages: Array<string>;
};

export const authAPI = {
	/* 	me() {
		return instance.get<MeResponseType>(`auth/me`).then(res => res.data);
	}, */
	//* refactored
	async me() {
		const res = await instance.get<MeResponseType>(`auth/me`);
		return res.data;
	},
	/* 	login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
		return instance
			.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha })
			.then(res => res.data);
	}, */
	//* refactored
	async login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
		const res = await instance.post<LoginResponseType>(`auth/login`, {
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

export const securityAPI = {
	getCaptchaUrl() {
		return instance.get(`security/get-captcha-url`);
	},
};
