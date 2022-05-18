import React from 'react';
import Users from './Users';
import axios from 'axios';
import { connect } from 'react-redux';
import {
	followActionCreator,
	unfollowActionCreator,
	setUsersActionCreator,
	setCurrentPageActionCreator,
	setUsersTotalCountActionCreator,
	toggleIsFetchingActionCreator,
} from '../../redux/users-reducer';
import Preloader from '../commons/Preloader/Preloader';

const mapStateToProps = state => {
	return {
		users: state.usersPage.users,
		pageSize: state.usersPage.pageSize,
		usersTotalCount: state.usersPage.usersTotalCount,
		currentPage: state.usersPage.currentPage,
		isFetching: state.usersPage.isFetching,
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
			<div>
				{/* {this.props.isFetching ? <Preloader /> : null}
				<Users
					users={this.props.users}
					usersTotalCount={this.props.usersTotalCount}
					pageSize={this.props.pageSize}
					currentPage={this.props.currentPage}
					follow={this.props.follow}
					unfollow={this.props.unfollow}
					onPageChanged={this.onPageChanged}
				/> */}
				{this.props.isFetching ? (
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
				)}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
