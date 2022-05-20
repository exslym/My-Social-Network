// @ts-nocheck
import React from 'react';
import Preloader from '../../commons/Preloader/Preloader';
import avatar from '../../../assets/avatar.png';
import styles from './ProfileInfo.module.scss';

const ProfileInfo = props => {
	if (!props.profile) {
		return <Preloader />;
	}
	return (
		<div className={styles.app_profile_content}>
			{/* <img className={styles.avatar} src={avatar} alt='avatar' /> */}
			<img
				className={styles.avatar}
				src={props.profile.photos.large ? props.profile.photos.large : avatar}
				alt='avatar'
			/>
			<div className={styles.info}>
				<p className={styles.info_username}>{props.profile.fullName}</p>
				<p className={styles.info_status}>{props.profile.aboutMe}</p>
				<p className={styles.info_employmentStatus}>
					{props.profile.lookingForAJob ? 'трудоустроен' : 'ищу работу'}
				</p>
				<p className={styles.info_employment}>{props.profile.lookingForAJobDescription}</p>
			</div>
		</div>
	);
};

export default ProfileInfo;
