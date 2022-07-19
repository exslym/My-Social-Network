import type { UserType } from '../types/types';
import type { AppStateType } from './redux-store';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
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
	users: [] as Array<UserType>,
	pageSize: 10,
	usersTotalCount: 0,
	currentPage: 1,
	isFetching: true,
	followingInProgress: [] as Array<number>, //* array of users' id
};

const usersReducer = (state = initialState, action: ActionTypes): initialStateType => {
	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				/* users: state.users.map(user => {
					if (user.id === action.userId) {
						return { ...user, followed: true };
					}
					return user;
				}), */
				//* refactored:
				users: updateObjectInArray(state.users, action.userId, 'id', { followed: true }),
			};

		case UNFOLLOW:
			return {
				...state,
				/* users: state.users.map(user => {
					if (user.id === action.userId) {
						return { ...user, followed: false };
					}
					return user;
				}), */
				//* refactored:
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

//* TYPES:
type initialStateType = typeof initialState;
type ActionTypes =
	| FollowSuccesActionType
	| UnfollowSuccesActionType
	| SetUsersActionType
	| SetCurrentPageActionType
	| SetUsersTotalCountActionType
	| ToggleIsFetchingActionType
	| ToggleFollowingProgressActionType;

type FollowSuccesActionType = {
	type: typeof FOLLOW;
	userId: number;
};
type UnfollowSuccesActionType = {
	type: typeof UNFOLLOW;
	userId: number;
};
type SetUsersActionType = {
	type: typeof SET_USERS;
	users: Array<UserType>;
};
type SetCurrentPageActionType = {
	type: typeof SET_CURRENT_PAGE;
	currentPage: number;
};
type SetUsersTotalCountActionType = {
	type: typeof SET_USERS_TOTAL_COUNT;
	count: number;
};
type ToggleIsFetchingActionType = {
	type: typeof TOGGLE_IS_FETCHING;
	isFetching: boolean;
};
type ToggleFollowingProgressActionType = {
	type: typeof TOGGLE_IS_FOLLOWING_PROGRESS;
	isFetching: boolean;
	userId: number;
};

//* ACTION_CREATORS:
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
//* refactored:
export const followSucces = (userId: number): FollowSuccesActionType => ({ type: FOLLOW, userId });
export const unfollowSucces = (userId: number): UnfollowSuccesActionType => ({
	type: UNFOLLOW,
	userId,
});
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({
	type: SET_USERS,
	users,
});
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
	type: SET_CURRENT_PAGE,
	currentPage,
});
export const setUsersTotalCount = (usersTotalCount: number): SetUsersTotalCountActionType => ({
	type: SET_USERS_TOTAL_COUNT,
	count: usersTotalCount,
});
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
	type: TOGGLE_IS_FETCHING,
	isFetching,
});
export const toggleFollowingProgress = (
	isFetching: boolean,
	userId: number,
): ToggleFollowingProgressActionType => ({
	type: TOGGLE_IS_FOLLOWING_PROGRESS,
	isFetching,
	userId,
});

//* TYPES:
// type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionTypes>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

//* THUNKS:
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
//* refactored:
export const requestUsers = (page: number, pageSize: number): ThunkType => {
	return async (dispatch, getState) => {
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
//* refactored:
const _followUnfollowFlow = async (
	dispatch: DispatchType,
	userId: number,
	apiMethod: any,
	actionCreator: (userId: number) => FollowSuccesActionType | UnfollowSuccesActionType,
) => {
	dispatch(toggleFollowingProgress(true, userId));
	let response = await apiMethod(userId);
	if (response.data.resultCode === 0) {
		dispatch(actionCreator(userId));
	}
	dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
	return async dispatch => {
		_followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSucces);
	};
};

export const unfollow = (userId: number): ThunkType => {
	return async dispatch => {
		_followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSucces);
	};
};

export default usersReducer;
