import axios from 'axios';

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: { 'API-KEY': '254005db-0ca0-46a6-8acf-d019e2f14645' },
});

export const usersAPI = {
	getUsers(currentPage = 1, pageSize = 10) {
		return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => {
			return response.data;
		});
	},
	follow(id) {
		return instance.post(`follow/${id}`).then(response => {
			return response.data;
		});
	},
	unfollow(id) {
		return instance.delete(`follow/${id}`).then(response => {
			return response.data;
		});
	},
};
