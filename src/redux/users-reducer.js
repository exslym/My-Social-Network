// import { createReducer } from '@reduxjs/toolkit';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

let initialState = {
	users: [],
};

/* let initialState = {
	users: [
		{
			id: 1,
			avatar: 'avatar1.png',
			followed: false,
			status: 'learning react',
			firstName: 'Andrey',
			location: { cityName: 'Moscow', countryName: 'Russia' },
		},
		{
			id: 2,
			avatar: 'avatar2.png',
			followed: true,
			status: 'shopping',
			firstName: 'Michael',
			location: { cityName: 'New York', countryName: 'USA' },
		},
		{
			id: 3,
			avatar: 'avatar3.png',
			followed: false,
			status: 'looking for job',
			firstName: 'John',
			location: { cityName: 'Minsk', countryName: 'Belarus' },
		},
		{
			id: 4,
			avatar: 'avatar4.png',
			followed: true,
			status: 'slow riding',
			firstName: 'Vika',
			location: { cityName: 'Saint-Petersburg', countryName: 'Russia' },
		},
		{
			id: 5,
			avatar: 'avatar5.png',
			followed: true,
			status: 'coffee',
			firstName: 'Viktor',
			location: { cityName: 'Rome', countryName: 'Italy' },
		},
	],
}; */

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				users: state.users.map(user => {
					if (user.id === action.userId) {
						return { ...user, followed: true };
					}
					return user;
				}),
			};

		case UNFOLLOW:
			return {
				...state,
				users: state.users.map(user => {
					if (user.id === action.userId) {
						return { ...user, followed: false };
					}
					return user;
				}),
			};

		case SET_USERS:
			return {
				...state,
				users: [...action.users],
			};

		default:
			return state;
	}
};

export const followActionCreator = userId => ({ type: FOLLOW, userId });
export const unfollowActionCreator = userId => ({ type: UNFOLLOW, userId });
export const setUsersActionCreator = users => ({ type: SET_USERS, users });
// export const setUsersActionCreator = users => ({ type: SET_USERS, ...users });

export default usersReducer;
