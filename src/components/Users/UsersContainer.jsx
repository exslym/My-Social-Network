import React from 'react';
import Users from './Users';
import Preloader from '../commons/Preloader/Preloader';
import axios from 'axios';
import { connect } from 'react-redux';
import {
	follow,
	unfollow,
	setUsers,
	setCurrentPage,
	setUsersTotalCount,
	toggleIsFetching,
} from '../../redux/users-reducer';
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
		this.props.toggleIsFetching(true);
		axios
			.get(
				`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`,
			)
			.then(response => {
				this.props.toggleIsFetching(false);
				this.props.setUsers(response.data.items);
				this.props.setUsersTotalCount(response.data.totalCount);
			});
	}

	onPageChanged = pageNumber => {
		this.props.setCurrentPage(pageNumber);
		this.props.toggleIsFetching(true);
		axios
			.get(
				`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`,
			)
			.then(response => {
				this.props.toggleIsFetching(false);
				this.props.setUsers(response.data.items);
			});
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
					onPageChanged={this.onPageChanged}
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

const mapStateToProps = state => {
	return {
		users: state.usersPage.users,
		pageSize: state.usersPage.pageSize,
		usersTotalCount: state.usersPage.usersTotalCount,
		currentPage: state.usersPage.currentPage,
		isFetching: state.usersPage.isFetching,
	};
};

// REFACTORED:
// const mapDispatchToProps = dispatch => {
// 	return {
// 		follow: userId => {
// 			dispatch(followActionCreator(userId));
// 		},
// 		unfollow: userId => {
// 			dispatch(unfollowActionCreator(userId));
// 		},
// 		setUsers: users => {
// 			dispatch(setUsersActionCreator(users));
// 		},
// 		setCurrentPage: pageNumber => {
// 			dispatch(setCurrentPageActionCreator(pageNumber));
// 		},
// 		setUsersTotalCount: totalCount => {
// 			dispatch(setUsersTotalCountActionCreator(totalCount));
// 		},
// 		toggleIsFetching: isFetching => {
// 			dispatch(toggleIsFetchingActionCreator(isFetching));
// 		},
// 	};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

export default connect(mapStateToProps, {
	follow: follow,
	unfollow: unfollow,
	setUsers: setUsers,
	setCurrentPage: setCurrentPage,
	setUsersTotalCount: setUsersTotalCount,
	toggleIsFetching: toggleIsFetching,
})(UsersContainer);
