import type { AppStateType } from './redux-store';
import { createSelector } from '@reduxjs/toolkit';

const getUsers = (state: AppStateType) => {
	return state.usersPage.users;
};

export const getUsersSelector = createSelector(getUsers, users => {
	return users.filter(u => true);
});

export const getPageSizeSelector = (state: AppStateType) => {
	return state.usersPage.pageSize;
};

export const getUsersTotalCountSelector = (state: AppStateType) => {
	return state.usersPage.usersTotalCount;
};

export const getCurrentPageSelector = (state: AppStateType) => {
	return state.usersPage.currentPage;
};

export const getIsFetchingSelector = (state: AppStateType) => {
	return state.usersPage.isFetching;
};

export const getFollowingInProgressSelector = (state: AppStateType) => {
	return state.usersPage.followingInProgress;
};
