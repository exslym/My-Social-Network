import { instance } from './api';
import type { GetItemsType, APIResponseType } from './api';

export const usersAPI = {
	async getUsers(
		currentPage: number = 1,
		pageSize: number = 10,
		term: string = '',
		friend: null | boolean = null,
	) {
		const res = await instance.get<GetItemsType>(
			`users?page=${currentPage}&count=${pageSize}&term=${term}` +
				(friend === null ? '' : `&friend=${friend}`),
		);
		return res.data;
	},
	async follow(userId: number) {
		const res = await instance.post<APIResponseType>(`follow/${userId}`);
		return res.data;
	},
	unfollow(userId: number) {
		return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<APIResponseType>;
	},
	// getProfile(userId: number) {
	// 	console.log('Obsolete method. Please use profileAPI object');
	// 	return profileAPI.getProfile(userId);
	// },
};
