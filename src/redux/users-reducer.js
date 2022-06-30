// import { createReducer } from '@reduxjs/toolkit';
import { usersAPI } from '../api/api';
import { updateObjectInArray } from '../utils/object-helpers';

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
				/* 				users: state.users.map(user => {
					if (user.id === action.userId) {
						return { ...user, followed: true };
					}
					return user;
				}), */
				//refactored:
				users: updateObjectInArray(state.users, action.userId, 'id', { followed: true }),
			};

		case UNFOLLOW:
			return {
				...state,
				/* 				users: state.users.map(user => {
					if (user.id === action.userId) {
						return { ...user, followed: false };
					}
					return user;
				}), */
				//refactored:
				users: updateObjectInArray(state.users, action.userId, 'id', { followed: false }),
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
/* export const followActionCreator = userId => ({ type: FOLLOW, userId });
export const unfollowActionCreator = userId => ({ type: UNFOLLOW, userId });
export const setUsersActionCreator = users => ({ type: SET_USERS, users });
export const setCurrentPageActionCreator = currentPage => ({ type: SET_CURRENT_PAGE, currentPage });
export const setUsersTotalCountActionCreator = usersTotalCount => ({
	type: SET_USERS_TOTAL_COUNT,
	count: usersTotalCount,
});
export const toggleIsFetchingActionCreator = isFetching => ({
	type: TOGGLE_IS_FETCHING,
	isFetching,
}); */

// ACTION_CREATORS:
export const followSucces = userId => ({ type: FOLLOW, userId });
export const unfollowSucces = userId => ({ type: UNFOLLOW, userId });
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

//THUNKS:
/* export const requestUsers = (page, pageSize) => {
	return dispatch => {
		dispatch(toggleIsFetching(true));
		dispatch(setCurrentPage(page));

		usersAPI.requestUsers(page, pageSize).then(data => {
			dispatch(toggleIsFetching(false));
			dispatch(setUsers(data.items));
			dispatch(setUsersTotalCount(data.totalCount));
			// dispatch(setCurrentPage(page));
		});
	};
}; */
//refactored:
export const requestUsers = (page, pageSize) => {
	return async dispatch => {
		dispatch(toggleIsFetching(true));
		dispatch(setCurrentPage(page));

		let data = await usersAPI.requestUsers(page, pageSize);
		dispatch(toggleIsFetching(false));
		dispatch(setUsers(data.items));
		dispatch(setUsersTotalCount(data.totalCount));
	};
};

/* export const follow = userId => {
	return dispatch => {
		dispatch(toggleFollowingProgress(true, userId));
		usersAPI.follow(userId).then(response => {
			if (response.data.resultCode === 0) {
				dispatch(followSucces(userId));
			}
			dispatch(toggleFollowingProgress(false, userId));
		});
	};
}; 
export const unfollow = userId => {
	return dispatch => {
		dispatch(toggleFollowingProgress(true, userId));
		usersAPI.unfollow(userId).then(response => {
			if (response.data.resultCode === 0) {
				dispatch(unfollowSucces(userId));
			}
			dispatch(toggleFollowingProgress(false, userId));
		});
	};
}; */
//refactored:
const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
	dispatch(toggleFollowingProgress(true, userId));
	let response = await apiMethod(userId);
	if (response.data.resultCode === 0) {
		dispatch(actionCreator(userId));
	}
	dispatch(toggleFollowingProgress(false, userId));
};

export const follow = userId => {
	return async dispatch => {
		followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSucces);
	};
};

export const unfollow = userId => {
	return async dispatch => {
		followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSucces);
	};
};

export default usersReducer;
