import React, { useEffect } from 'react';
import { FilterType, useTypedDispatch } from '../../redux/users-reducer';
import { requestUsers, follow, unfollow } from '../../redux/users-reducer';
import {
	getCurrentPageSelector,
	getFollowingInProgressSelector,
	getPageSizeSelector,
	getUsersFilter,
	getUsersSelector,
	getUsersTotalCountSelector,
} from '../../redux/users-selectors';
import { UsersSearchForm } from './UsersSearchForm';
import { useSelector } from 'react-redux';
import Paginator from '../commons/Paginator/Paginator';
import User from './User/User';
import styles from './Users.module.scss';

//* TYPES:

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
export const Users = () => {
	const users = useSelector(getUsersSelector);
	const usersTotalCount = useSelector(getUsersTotalCountSelector);
	const currentPage = useSelector(getCurrentPageSelector);
	const pageSize = useSelector(getPageSizeSelector);
	const filter = useSelector(getUsersFilter);
	const followingInProgress = useSelector(getFollowingInProgressSelector);

	// const dispatch = useDispatch();
	const dispatch = useTypedDispatch();

	useEffect(() => {
		dispatch(requestUsers(currentPage, pageSize, filter));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onPageChanged = (pageNumber: number) => {
		dispatch(requestUsers(pageNumber, pageSize, filter));
	};
	const onFilterChanged = (filter: FilterType) => {
		dispatch(requestUsers(1, pageSize, filter));
	};
	const _follow = (userId: number) => {
		dispatch(follow(userId));
	};
	const _unfollow = (userId: number) => {
		dispatch(unfollow(userId));
	};

	const usersElements = users.map(user => {
		return (
			<User
				key={user.id}
				user={user}
				avatar={user.photos.small}
				followingInProgress={followingInProgress}
				follow={_follow}
				unfollow={_unfollow}
			/>
		);
	});

	return (
		<div className={styles.app_friends}>
			<UsersSearchForm onFilterChanged={onFilterChanged} />
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
