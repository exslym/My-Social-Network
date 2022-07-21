import { instance } from './api';
import type { APIResponseType } from './api';
import type { PhotosType, ProfileType } from '../types/types';

//* TYPES:
type SavePhotoResponseDataType = {
	photos: PhotosType;
};

export const profileAPI = {
	async getProfile(userId: number) {
		const res = await instance.get<ProfileType>(`profile/${userId}`);
		return res.data;
	},
	async getStatus(userId: number) {
		const res = await instance.get<string>(`profile/status/${userId}`);
		return res.data;
	},
	async updateStatus(status: string) {
		const res = await instance.put<APIResponseType>(`profile/status`, { status: status });
		return res.data;
	},
	async savePhoto(imageFile: File) {
		const formData = new FormData();
		formData.append('image', imageFile);
		const res = await instance.put<APIResponseType<SavePhotoResponseDataType>>(
			`profile/photo`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		);
		return res.data;
	},
	async saveProfile(profile: ProfileType) {
		const res = await instance.put<APIResponseType>(`profile`, profile);
		return res.data;
	},
};
