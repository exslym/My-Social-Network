// import React from 'react';
import Users from './Users';
import { connect } from 'react-redux';
import {
	followActionCreator,
	unfollowActionCreator,
	setUsersActionCreator,
	setCurrentPageActionCreator,
	setUsersTotalCountActionCreator,
} from '../../redux/users-reducer';

const mapStateToProps = state => {
	return {
		users: state.usersPage.users,
		pageSize: state.usersPage.pageSize,
		usersTotalCount: state.usersPage.usersTotalCount,
		currentPage: state.usersPage.currentPage,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		follow: userId => {
			dispatch(followActionCreator(userId));
		},
		unfollow: userId => {
			dispatch(unfollowActionCreator(userId));
		},
		setUsers: users => {
			dispatch(setUsersActionCreator(users));
		},
		setCurrentPage: pageNumber => {
			dispatch(setCurrentPageActionCreator(pageNumber));
		},
		setUsersTotalCount: totalCount => {
			dispatch(setUsersTotalCountActionCreator(totalCount));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
