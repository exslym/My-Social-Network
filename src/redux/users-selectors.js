import { createSelector } from '@reduxjs/toolkit';

const getUsers = state => {
	return state.usersPage.users;
};

export const getUsersSelector = createSelector(getUsers, users => {
	return users.filter(u => true);
});

export const getPageSizeSelector = state => {
	return state.usersPage.pageSize;
};

export const getUsersTotalCountSelector = state => {
	return state.usersPage.usersTotalCount;
};

export const getCurrentPageSelector = state => {
	return state.usersPage.currentPage;
};

export const getIsFetchingSelector = state => {
	return state.usersPage.isFetching;
};

export const getFollowingInProgressSelector = state => {
	return state.usersPage.followingInProgress;
};
