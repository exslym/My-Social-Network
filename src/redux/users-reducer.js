// import { createReducer } from '@reduxjs/toolkit';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
	users: [],
	pageSize: 10,
	usersTotalCount: 0,
	currentPage: 1,
	isFetching: true,
	followingInProgress: [],
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
				users: action.users,
			};

		case SET_CURRENT_PAGE:
			return {
				...state,
				currentPage: action.currentPage,
			};

		case SET_USERS_TOTAL_COUNT:
			return {
				...state,
				usersTotalCount: action.count,
			};

		case TOGGLE_IS_FETCHING:
			return {
				...state,
				isFetching: action.isFetching,
			};
		case TOGGLE_IS_FOLLOWING_PROGRESS:
			return {
				...state,
				followingInProgress: action.isFetching
					? [...state.followingInProgress, action.userId]
					: state.followingInProgress.filter(id => id !== action.userId),
			};

		default:
			return state;
	}
};

// REFACTORED:
// export const followActionCreator = userId => ({ type: FOLLOW, userId });
// export const unfollowActionCreator = userId => ({ type: UNFOLLOW, userId });
// export const setUsersActionCreator = users => ({ type: SET_USERS, users });
// export const setCurrentPageActionCreator = currentPage => ({ type: SET_CURRENT_PAGE, currentPage });
// export const setUsersTotalCountActionCreator = usersTotalCount => ({
// 	type: SET_USERS_TOTAL_COUNT,
// 	count: usersTotalCount,
// });
// export const toggleIsFetchingActionCreator = isFetching => ({
// 	type: TOGGLE_IS_FETCHING,
// 	isFetching,
// });

export const follow = userId => ({ type: FOLLOW, userId });
export const unfollow = userId => ({ type: UNFOLLOW, userId });
export const setUsers = users => ({ type: SET_USERS, users });
export const setCurrentPage = currentPage => ({ type: SET_CURRENT_PAGE, currentPage });
export const setUsersTotalCount = usersTotalCount => ({
	type: SET_USERS_TOTAL_COUNT,
	count: usersTotalCount,
});
export const toggleIsFetching = isFetching => ({
	type: TOGGLE_IS_FETCHING,
	isFetching,
});
export const toggleFollowingProgress = (isFetching, userId) => ({
	type: TOGGLE_IS_FOLLOWING_PROGRESS,
	isFetching,
	userId,
});

export default usersReducer;
