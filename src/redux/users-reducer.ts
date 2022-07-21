import type { UserType } from '../types/types';
import type { InferActionsTypes, BaseThunkType } from './redux-store';
import { Dispatch } from 'redux';
import { updateObjectInArray } from '../utils/object-helpers';
import { usersAPI } from '../api/users-api';

//* TYPES:
type initialStateType = typeof initialState;
type DispatchType = Dispatch<ActionsTypes>;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;

let initialState = {
	users: [] as Array<UserType>,
	pageSize: 10,
	usersTotalCount: 0,
	currentPage: 1,
	isFetching: true,
	followingInProgress: [] as Array<number>, //* array of users' id
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
	followSucces: (userId: number) => ({ type: 'SN/USERS/FOLLOW', userId } as const),
	unfollowSucces: (userId: number) =>
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
export const requestUsers = (page: number, pageSize: number): ThunkType => {
	return async (dispatch, getState) => {
		dispatch(actions.toggleIsFetching(true));
		dispatch(actions.setCurrentPage(page));

		let data = await usersAPI.requestUsers(page, pageSize);
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
	apiMethod: any,
	actionCreator: (userId: number) => ActionsTypes,
) => {
	dispatch(actions.toggleFollowingProgress(true, userId));
	let response = await apiMethod(userId);
	if (response.data.resultCode === 0) {
		dispatch(actionCreator(userId));
	}
	dispatch(actions.toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
	return async dispatch => {
		_followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSucces);
	};
};

export const unfollow = (userId: number): ThunkType => {
	return async dispatch => {
		_followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSucces);
	};
};

export default usersReducer;
