import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
	FilterType,
	follow,
	requestUsers,
	unfollow,
	useTypedDispatch,
} from '../../redux/users-reducer';
import {
	getCurrentPageSelector,
	getFollowingInProgressSelector,
	getPageSizeSelector,
	getUsersFilter,
	getUsersSelector,
	getUsersTotalCountSelector,
} from '../../redux/users-selectors';
import Paginator from '../commons/Paginator/Paginator';
import User from './User/User';
import styles from './Users.module.scss';
import { UsersSearchForm } from './UsersSearchForm';

//* TYPES:
// type QueryParamsType = { term?: string; page?: string; friend?: string };

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

	const dispatch = useTypedDispatch();
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();
	// const dispatch = useDispatch();

	useEffect(() => {
		const term = searchParams.get('term');
		const friend = searchParams.get('friend');
		const page = searchParams.get('page');

		let actualPage = currentPage;
		let actualFilter = filter;

		if (!!page) actualPage = Number(page);
		if (!!term) actualFilter = { ...actualFilter, term: term as string };
		switch (friend) {
			case 'null':
				actualFilter = { ...actualFilter, friend: null };
				break;
			case 'true':
				actualFilter = { ...actualFilter, friend: true };
				break;
			case 'false':
				actualFilter = { ...actualFilter, friend: false };
				break;
		}

		dispatch(requestUsers(actualPage, pageSize, actualFilter));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		// const query: QueryParamsType = {};
		// if (!!filter.term) query.term = filter.term;
		// if (filter.friend !== null) query.friend = String(filter.friend);
		// if (currentPage !== 1) query.page = String(currentPage);

		const term = filter.term;
		const friend = filter.friend;

		let urlQuery =
			(term === '' ? '' : `&term=${term}`) +
			(friend === null ? '' : `&friend=${friend}`) +
			(currentPage === 1 ? '' : `&page=${currentPage}`);

		setSearchParams(urlQuery);

		navigate({
			pathname: '/users',
			search: urlQuery,
		});
	}, [currentPage, filter, setSearchParams, navigate]);

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
