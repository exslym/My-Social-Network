import { createSelector } from '@reduxjs/toolkit';
import type { AppStateGlobalType } from './redux-store';

const getUsers = (state: AppStateGlobalType) => {
	return state.usersPage.users;
};

export const getUsersSelector = createSelector(getUsers, users => {
	return users.filter(u => true);
});

export const getPageSizeSelector = (state: AppStateGlobalType) => {
	return state.usersPage.pageSize;
};

export const getUsersTotalCountSelector = (state: AppStateGlobalType) => {
	return state.usersPage.usersTotalCount;
};

export const getCurrentPageSelector = (state: AppStateGlobalType) => {
	return state.usersPage.currentPage;
};

export const getIsFetchingSelector = (state: AppStateGlobalType) => {
	return state.usersPage.isFetching;
};

export const getFollowingInProgressSelector = (state: AppStateGlobalType) => {
	return state.usersPage.followingInProgress;
};

export const getUsersFilter = (state: AppStateGlobalType) => {
	return state.usersPage.filter;
};
