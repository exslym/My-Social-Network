import { instance } from './api';

//* TYPES:
type GetCaptchaUrlResponseDataType = {
	url: string;
};

export const securityAPI = {
	async getCaptchaUrl() {
		const res = await instance.get<GetCaptchaUrlResponseDataType>(`security/get-captcha-url`);
		return res.data;
	},
};
