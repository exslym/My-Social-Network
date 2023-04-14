import axios from 'axios';
// import * as dotenv from 'dotenv';
// import config from '../config';
import type { UserType } from '../types/types';

// dotenv.config();

export const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: { 'API-KEY': '254005db-0ca0-46a6-8acf-d019e2f14645' },
	// baseURL: config.BASE_URL,
	// headers: { 'API-KEY': config.API_KEY },
});

//* ENUMS:
export enum ResultCodesEnum {
	Success = 0,
	Error = 1,
}
export enum ResultCodesForCaptchaEnum {
	CaptchaIsRequired = 10,
}

//* TYPES:
export type GetItemsType = {
	items: Array<UserType>;
	totalCount: number;
	error: string | null;
};
export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
	data: D;
	messages: Array<string>;
	resultCode: RC;
};
