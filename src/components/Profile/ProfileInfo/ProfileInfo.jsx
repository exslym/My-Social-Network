// @ts-nocheck
import React from 'react';
import Preloader from '../../commons/Preloader/Preloader';
// import ProfileStatus from './ProfileStatus';
import styles from './ProfileInfo.module.scss';
import avatar from '../../../assets/avatar-wh.png';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = props => {
	if (!props.profile) {
		return <Preloader />;
	}

	const onAvatarSelected = e => {
		if (e.target.files.length) {
			props.savePhoto(e.target.files[0]);
		}
	};

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
				<p className={styles.info_employment}>{props.profile.lookingForAJobDescription}</p>
				<ProfileStatusWithHooks
					profile={props.profile}
					status={props.status}
					updateUserStatus={props.updateUserStatus}
				/>
				{props.isOwner && (
					<input className={styles.fileloader} type={'file'} onChange={onAvatarSelected} />
				)}
			</div>
		</div>
	);
};

export default ProfileInfo;
