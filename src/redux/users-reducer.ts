import type { UserType } from '../types/types';
import type { InferActionsTypes, BaseThunkType, AppStateType } from './redux-store';
import type { APIResponseType } from '../api/api';
import { Dispatch } from 'redux';
import { updateObjectInArray } from '../utils/object-helpers';
import { usersAPI } from '../api/users-api';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

//* TYPES:
export type initialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;
export type ThunkType = BaseThunkType<ActionsTypes>;
type DispatchType = Dispatch<ActionsTypes>;
type ActionsTypes = InferActionsTypes<typeof actions>;

//* Typed DISPATCH:
export type TypedDispatch = ThunkDispatch<AppStateType, any, ActionsTypes>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();

let initialState = {
	users: [] as Array<UserType>,
	pageSize: 10,
	usersTotalCount: 0,
	currentPage: 1,
	isFetching: true,
	followingInProgress: [] as Array<number>, //* array of users' id
	filter: {
		term: '',
		friend: null as null | boolean,
	},
};

const usersReducer = (state = initialState, action: ActionsTypes): initialStateType => {
	switch (action.type) {
		case 'SN/USERS/FOLLOW':
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', { followed: true }),
			};
		case 'SN/USERS/UNFOLLOW':
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', { followed: false }),
			};
		case 'SN/USERS/SET_USERS':
			return {
				...state,
				users: action.users,
			};
		case 'SN/USERS/SET_CURRENT_PAGE':
			return {
				...state,
				currentPage: action.currentPage,
			};
		case 'SN/USERS/SET_FILTER':
			return {
				...state,
				filter: action.payload,
			};
		case 'SN/USERS/SET_USERS_TOTAL_COUNT':
			return {
				...state,
				usersTotalCount: action.count,
			};
		case 'SN/USERS/TOGGLE_IS_FETCHING':
			return {
				...state,
				isFetching: action.isFetching,
			};
		case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
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

//* ACTION_CREATORS:
export const actions = {
	followSuccess: (userId: number) => ({ type: 'SN/USERS/FOLLOW', userId } as const),
	unfollowSuccess: (userId: number) =>
		({
			type: 'SN/USERS/UNFOLLOW',
			userId,
		} as const),
	setUsers: (users: Array<UserType>) =>
		({
			type: 'SN/USERS/SET_USERS',
			users,
		} as const),
	setCurrentPage: (currentPage: number) =>
		({
			type: 'SN/USERS/SET_CURRENT_PAGE',
			currentPage,
		} as const),
	setFilter: (filter: FilterType) =>
		({
			type: 'SN/USERS/SET_FILTER',
			payload: filter,
		} as const),
	setUsersTotalCount: (usersTotalCount: number) =>
		({
			type: 'SN/USERS/SET_USERS_TOTAL_COUNT',
			count: usersTotalCount,
		} as const),
	toggleIsFetching: (isFetching: boolean) =>
		({
			type: 'SN/USERS/TOGGLE_IS_FETCHING',
			isFetching,
		} as const),
	toggleFollowingProgress: (isFetching: boolean, userId: number) =>
		({
			type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
			isFetching,
			userId,
		} as const),
};

//* THUNKS:
export const requestUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => {
	return async (dispatch, getState) => {
		dispatch(actions.toggleIsFetching(true));
		dispatch(actions.setCurrentPage(page));
		dispatch(actions.setFilter(filter));

		let data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend);
		dispatch(actions.toggleIsFetching(false));
		dispatch(actions.setUsers(data.items));
		dispatch(actions.setUsersTotalCount(data.totalCount));
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
//* refactored:
const _followUnfollowFlow = async (
	dispatch: DispatchType,
	userId: number,
	apiMethod: (userId: number) => Promise<APIResponseType>,
	actionCreator: (userId: number) => ActionsTypes,
) => {
	dispatch(actions.toggleFollowingProgress(true, userId));
	let response = await apiMethod(userId);
	if (response.resultCode === 0) {
		dispatch(actionCreator(userId));
	}
	dispatch(actions.toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
	return async dispatch => {
		await _followUnfollowFlow(
			dispatch,
			userId,
			usersAPI.follow.bind(usersAPI),
			actions.followSuccess,
		);
	};
};

export const unfollow = (userId: number): ThunkType => {
	return async dispatch => {
		await _followUnfollowFlow(
			dispatch,
			userId,
			usersAPI.unfollow.bind(usersAPI),
			actions.unfollowSuccess,
		);
	};
};

export default usersReducer;
