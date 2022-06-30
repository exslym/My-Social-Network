import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
	follow,
	unfollow,
	setCurrentPage,
	toggleFollowingProgress,
	requestUsers,
} from '../../redux/users-reducer';
import {
	getUsersSelector,
	getPageSizeSelector,
	getUsersTotalCountSelector,
	getCurrentPageSelector,
	getIsFetchingSelector,
	getFollowingInProgressSelector,
} from '../../redux/users-selectors';
import Preloader from '../commons/Preloader/Preloader';
import Users from './Users';

// import { withAuthRedirect } from '../../hoc/withAuthRedirect';
// import { usersAPI } from '../../api/api';
// REFACTORED:
// import {
// 	followActionCreator,
// 	unfollowActionCreator,
// 	setUsersActionCreator,
// 	setCurrentPageActionCreator,
// 	setUsersTotalCountActionCreator,
// 	toggleIsFetchingActionCreator,
// } from '../../redux/users-reducer';

class UsersContainer extends React.Component {
	componentDidMount() {
		/* 		this.props.toggleIsFetching(true);
		usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
			this.props.toggleIsFetching(false);
			this.props.setUsers(data.items);
			this.props.setUsersTotalCount(data.totalCount);
		}); */
		// REFACTORED:
		this.props.requestUsers(this.props.currentPage, this.props.pageSize);
	}

	onPageChanged = pageNumber => {
		/* 		this.props.setCurrentPage(pageNumber);
		this.props.toggleIsFetching(true);
		usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
			this.props.toggleIsFetching(false);
			this.props.setUsers(data.items);
		}); */
		// REFACTORED:
		this.props.requestUsers(pageNumber, this.props.pageSize);
		this.props.setCurrentPage(pageNumber);
		// this.props.setCurrentPage(this.props.currentPage, this.props.pageSize);
	};

	render() {
		return (
			<>
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
// REFACTORED:

const mapStateToProps = state => {
	return {
		users: getUsersSelector(state),
		pageSize: getPageSizeSelector(state),
		usersTotalCount: getUsersTotalCountSelector(state),
		currentPage: getCurrentPageSelector(state),
		isFetching: getIsFetchingSelector(state),
		followingInProgress: getFollowingInProgressSelector(state),
	};
};

export default compose(
	connect(mapStateToProps, {
		follow,
		unfollow,
		setCurrentPage,
		toggleFollowingProgress,
		requestUsers,
	}),
)(UsersContainer);
