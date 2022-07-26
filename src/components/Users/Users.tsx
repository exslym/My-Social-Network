import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
import type { UserType } from '../../types/types';
import { UsersSearchForm } from './UsersSearchForm';
import Paginator from '../commons/Paginator/Paginator';
import User from './User/User';
import styles from './Users.module.scss';
import type { FilterType } from '../../redux/users-reducer';

//* TYPES:
type PropsType = {
	currentPage: number;
	usersTotalCount: number;
	pageSize: number;
	onPageChanged: (pageNumber: number) => void;
	onFilterChanged: (filter: FilterType) => void;
	follow: (userId: number) => void;
	unfollow: (userId: number) => void;
	followingInProgress: Array<number>;
	users: Array<UserType>;
};

/* let Users = props => {
	let pagesCount = Math.ceil(props.usersTotalCount / props.pageSize);
	let pages = [];
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i);
	}

	let curP = props.currentPage;
	let curPF = curP - 5 < 0 ? 0 : curP - 5;
	let curPL = curP + 4;
	let slicedPages = pages.slice(curPF, curPL);

	let follow = props.follow;
	let unfollow = props.unfollow;
	let followingInProgress = props.followingInProgress;
	// let toggleFollowingProgress = props.toggleFollowingProgress;

	let usersElements = props.users.map(user => {
		return (
			<User
				key={user.id}
				id={user.id}
				status={user.status}
				avatar={user.photos.small}
				name={user.name}
				followed={user.followed}
				follow={follow}
				unfollow={unfollow}
				followingInProgress={followingInProgress}
				// toggleFollowingProgress={toggleFollowingProgress}
				// avatar={user.avatar}
				// firstName={user.firstName}
				// location={user.location}
				// cityName={user.location.cityName}
				// countryName={user.location.countryName}
			/>
		);
	});
	return (
		<div className={styles.app_friends}>
			<div className={styles.app_friends_pages}>
				{slicedPages.map(page => {
					return (
						<span
							onClick={() => {
								props.onPageChanged(page);
							}}
							className={props.currentPage === page ? styles.app_friends_selectedPage : undefined}
							key={page}
						>
							{page}
						</span>
					);
				})}
			</div>
			<div className={styles.app_friends_items}>{usersElements}</div>
		</div>
	);
}; */
//* Refactored
let Users: React.FC<PropsType> = ({
	users,
	usersTotalCount,
	pageSize,
	currentPage,
	onPageChanged,
	...props
}) => {
	let follow = props.follow;
	let unfollow = props.unfollow;
	let followingInProgress = props.followingInProgress;

	const usersElements = users.map(user => {
		return (
			<User
				key={user.id}
				user={user}
				avatar={user.photos.small}
				followingInProgress={followingInProgress}
				follow={follow}
				unfollow={unfollow}
			/>
		);
	});

	return (
		<div className={styles.app_friends}>
			<UsersSearchForm onFilterChanged={props.onFilterChanged} />
			<Paginator
				currentPage={currentPage}
				onPageChanged={onPageChanged}
				itemsTotalCount={usersTotalCount}
				pageSize={pageSize}
			/>
			<div className={styles.app_friends_items}>{usersElements}</div>
		</div>
	);
};

export default Users;
