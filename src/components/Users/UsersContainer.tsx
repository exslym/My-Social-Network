import React from 'react';
import type { UserType } from '../../types/types';
import type { FilterType } from '../../redux/users-reducer';
import type { AppStateType } from '../../redux/redux-store';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
	follow,
	unfollow,
	requestUsers,
	// setCurrentPage,
	// toggleFollowingProgress,
} from '../../redux/users-reducer';
import {
	getUsersSelector,
	getPageSizeSelector,
	getUsersTotalCountSelector,
	getCurrentPageSelector,
	getIsFetchingSelector,
	getFollowingInProgressSelector,
	getUsersFilter,
} from '../../redux/users-selectors';
import Preloader from '../commons/Preloader/Preloader';
import Users from './Users';
/* import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { usersAPI } from '../../api/api';
REFACTORED:
import {
	followActionCreator,
	unfollowActionCreator,
	setUsersActionCreator,
	setCurrentPageActionCreator,
	setUsersTotalCountActionCreator,
	toggleIsFetchingActionCreator,
} from '../../redux/users-reducer'; */

//* TYPES:
type MapStatePropsType = {
	users: Array<UserType>;
	pageSize: number;
	usersTotalCount: number;
	currentPage: number;
	isFetching: boolean;
	followingInProgress: Array<number>;
	filter: FilterType;
};
type MapDispatchPropsType = {
	follow: (userId: number) => void;
	unfollow: (userId: number) => void;
	getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void;
	// setCurrentPage: (pageNumber: number) => void;
	// toggleFollowingProgress: (isFetching: boolean, userId: number) => void;
};
type OwnPropsType = {
	pageTitle: string;
	onPageChanged: (pageNumber: number) => void;
};
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {
	componentDidMount() {
		/* 		this.props.toggleIsFetching(true);
		usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
			this.props.toggleIsFetching(false);
			this.props.setUsers(data.items);
			this.props.setUsersTotalCount(data.totalCount);
		}); */
		//* REFACTORED:
		const { currentPage, pageSize, filter } = this.props;
		this.props.getUsers(currentPage, pageSize, filter);
	}

	onPageChanged = (pageNumber: number) => {
		/* 		this.props.setCurrentPage(pageNumber);
		this.props.toggleIsFetching(true);
		usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
			this.props.toggleIsFetching(false);
			this.props.setUsers(data.items);
		}); */
		//* REFACTORED:
		const { pageSize, filter } = this.props;
		this.props.getUsers(pageNumber, pageSize, filter);
	};

	onFilterChanged = (filter: FilterType) => {
		const { pageSize } = this.props;
		this.props.getUsers(1, pageSize, filter);
	};

	render() {
		return (
			<>
				{/* <h2>{this.props.pageTitle}</h2> */}
				{this.props.isFetching ? <Preloader /> : null}
				<Users
					users={this.props.users}
					usersTotalCount={this.props.usersTotalCount}
					pageSize={this.props.pageSize}
					currentPage={this.props.currentPage}
					follow={this.props.follow}
					unfollow={this.props.unfollow}
					followingInProgress={this.props.followingInProgress}
					onPageChanged={this.onPageChanged}
					onFilterChanged={this.onFilterChanged}
					// toggleFollowingProgress={this.props.toggleFollowingProgress}
				/>
				{/* {this.props.isFetching ? (
					<Preloader />
				) : (
					<Users
						users={this.props.users}
						usersTotalCount={this.props.usersTotalCount}
						pageSize={this.props.pageSize}
						currentPage={this.props.currentPage}
						follow={this.props.follow}
						unfollow={this.props.unfollow}
						onPageChanged={this.onPageChanged}
					/>
				)} */}
			</>
		);
	}
}

/* const mapStateToProps = state => {
	return {
		users: state.usersPage.users,
		pageSize: state.usersPage.pageSize,
		usersTotalCount: state.usersPage.usersTotalCount,
		currentPage: state.usersPage.currentPage,
		isFetching: state.usersPage.isFetching,
		followingInProgress: state.usersPage.followingInProgress,
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
		toggleIsFetching: isFetching => {
			dispatch(toggleIsFetchingActionCreator(isFetching));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

let withRedirect = withAuthRedirect(UsersContainer);
export default withAuthRedirect(
	connect(mapStateToProps, {
		follow,
		unfollow,
		setCurrentPage,
		toggleFollowingProgress,
		getUsers,
	})(UsersContainer),
); */
//* REFACTORED:

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
	return {
		users: getUsersSelector(state),
		pageSize: getPageSizeSelector(state),
		usersTotalCount: getUsersTotalCountSelector(state),
		currentPage: getCurrentPageSelector(state),
		isFetching: getIsFetchingSelector(state),
		followingInProgress: getFollowingInProgressSelector(state),
		filter: getUsersFilter(state),
	};
};

export default compose<React.ComponentType>(
	connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
		follow,
		unfollow,
		getUsers: requestUsers,
	}),
)(UsersContainer);
