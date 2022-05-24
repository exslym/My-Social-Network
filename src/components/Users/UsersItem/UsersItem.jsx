// @ts-nocheck
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './UsersItem.module.scss';
import defaultUserAvatar from '../../../assets/avatar.png';
// import axios from 'axios';
// import { usersAPI } from '../../../api/api';

const UsersItem = props => {
	return (
		<div className={styles.app_friends_item}>
			<div className={styles.app_friends_avatarBlock}>
				<NavLink to={`/profile/${props.id}`}>
					<img
						src={props.avatar != null ? props.avatar : defaultUserAvatar}
						alt='avatar'
						className={styles.app_friends_img}
					/>
				</NavLink>
				<div>
					{props.followed ? (
						<button
							className={styles.app_friends_unfollowButton}
							disabled={props.followingInProgress.includes(props.id)}
							// disabled={props.followingInProgress.some(id => id === props.id)}
							onClick={() => {
								props.unfollow(props.id);
								// props.toggleFollowingProgress(true, props.id);
								// usersAPI.unfollow(props.id).then(response => {
								// 	if (response.data.resultCode === 0) {
								// 		props.unfollow(props.id);
								// 	}
								// 	props.toggleFollowingProgress(false, props.id);
								// });

								// axios
								// 	.delete(`https://social-network.samuraijs.com/api/1.0/follow/${props.id}`, {
								// 		withCredentials: true,
								// 		headers: { 'API-KEY': '254005db-0ca0-46a6-8acf-d019e2f14645' },
								// 	})
								// 	.then(response => {
								// 		if (response.data.resultCode === 0) {
								// 			props.unfollow(props.id);
								// 		}
								// 		props.toggleFollowingProgress(false, props.id);
								// 	});
							}}
						>
							Unfollow
						</button>
					) : (
						<button
							className={styles.app_friends_followButton}
							disabled={props.followingInProgress.includes(props.id)}
							// disabled={props.followingInProgress.some(id => id === props.id)}
							onClick={() => {
								props.follow(props.id);
								// props.toggleFollowingProgress(true, props.id);
								// usersAPI.follow(props.id).then(response => {
								// 	if (response.data.resultCode === 0) {
								// 		props.follow(props.id);
								// 	}
								// 	props.toggleFollowingProgress(false, props.id);
								// });

								// axios
								// 	.post(
								// 		`https://social-network.samuraijs.com/api/1.0/follow/${props.id}`,
								// 		{},
								// 		{
								// 			withCredentials: true,
								// 			headers: { 'API-KEY': '254005db-0ca0-46a6-8acf-d019e2f14645' },
								// 		},
								// 	)
								// 	.then(response => {
								// 		if (response.data.resultCode === 0) {
								// 			props.follow(props.id);
								// 		}
								// 		props.toggleFollowingProgress(false, props.id);
								// 	});
							}}
						>
							Follow
						</button>
					)}
				</div>
			</div>
			<div className={styles.app_friends_infoBlock}>
				<div className={styles.app_friends_statusBlock}>
					<p className={styles.app_friends_name}>{props.name}</p>
					<p className={styles.app_friends_status}>
						{props.status != null ? props.status : 'no status'}
					</p>
				</div>
				<div className={styles.app_friends_locationBlock}>
					{/* <p className={styles.app_friends_country}>{props.countryName},</p>
					<p className={styles.app_friends_city}>{props.cityName}</p> */}
					<p className={styles.app_friends_country}>{'countryName'},</p>
					<p className={styles.app_friends_city}>{'cityName'}</p>
				</div>
			</div>
		</div>
	);
};

export default UsersItem;
