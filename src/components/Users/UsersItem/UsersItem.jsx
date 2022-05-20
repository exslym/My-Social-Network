// @ts-nocheck
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './UsersItem.module.css';
import defaultUserAvatar from '../../../assets/avatar.png';

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
							onClick={() => {
								props.unfollow(props.id);
							}}
							className={styles.app_friends_unfollowButton}
						>
							Unfollow
						</button>
					) : (
						<button
							onClick={() => {
								props.follow(props.id);
							}}
							className={styles.app_friends_followButton}
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
