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

	const uploadPhoto = e => {
		e.preventDefault();
		document.getElementById('avatarInput').click();
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
					<>
						<input
							id='avatarInput'
							className={styles.fileloader}
							type={'file'}
							onChange={onAvatarSelected}
						/>
						<div className={styles.fileloaderButton} onClick={uploadPhoto}>
							&#10047; <span className={styles.tooltip}>Upload photo</span>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ProfileInfo;
