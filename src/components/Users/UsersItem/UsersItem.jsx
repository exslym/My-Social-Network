import React from 'react';
import styles from './UsersItem.module.css';

const UsersItem = props => {
	let avatarSrc = require(`../../Dialogs/assets/${props.avatar}`);
	// let cityName = props.location.cityName;
	// let countryName = props.location.countryName;

	return (
		<div className={styles.app_friends_item}>
			<div className={styles.app_friends_avatarBlock}>
				<img src={avatarSrc} alt='avatar' className={styles.app_friends_img} />
				{/* <button
					onClick={() => {
						props.followedStatus === true ? props.unfollow(props.id) : props.follow(props.id);
					}}
				>
					{props.followed ? `Unfollow` : `Follow`}
				</button> */}
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
					<p className={styles.app_friends_name}>{props.firstName}</p>
					<p className={styles.app_friends_status}>{props.status}</p>
				</div>
				<div className={styles.app_friends_locationBlock}>
					<p className={styles.app_friends_country}>{props.countryName},</p>
					<p className={styles.app_friends_city}>{props.cityName}</p>
				</div>
			</div>
		</div>
	);
};

export default UsersItem;
