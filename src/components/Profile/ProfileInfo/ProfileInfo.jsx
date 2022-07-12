// @ts-nocheck
import React, { useState } from 'react';
import Preloader from '../../commons/Preloader/Preloader';
// import ProfileStatus from './ProfileStatus';
import styles from './ProfileInfo.module.scss';
import avatar from '../../../assets/avatar-wh.png';
// import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileDataForm from './ProfileDataForm';
import ProfileData from './ProfileData';
// import Contacts from './Contacts';

const ProfileInfo = props => {
	let [editMode, setEditMode] = useState(false);

	// let [initialValue, setValues] = useState(props.profile);

	// useEffect(() => {
	// 	setValues(props.profile);
	// }, [props.profile]);

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

	const onSubmit = formData => {
		props.saveProfile(formData).then(() => {
			setEditMode(false);
		});
	};

	return (
		<div className={styles.content}>
			<img
				className={styles.avatar}
				src={props.profile.photos.large ? props.profile.photos.large : avatar}
				alt='avatar'
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

			{editMode ? (
				<ProfileDataForm
					initialValues={props.profile}
					profile={props.profile}
					status={props.status}
					updateUserStatus={props.updateUserStatus}
					isOwner={props.isOwner}
					onSubmit={onSubmit}
				/>
			) : (
				<ProfileData
					profile={props.profile}
					status={props.status}
					updateUserStatus={props.updateUserStatus}
					isOwner={props.isOwner}
					goToEditMode={() => {
						setEditMode(true);
					}}
				/>
			)}
		</div>
	);
};

// const ProfileData = props => {
// 	return (
// 		<>
// 			{props.isOwner && (
// 				<button className={styles.editButton} onClick={props.goToEditMode}>
// 					edit mode
// 				</button>
// 			)}
// 			<div className={styles.info}>
// 				<div className={styles.info_username}>{props.profile.fullName}</div>
// 				<ProfileStatusWithHooks
// 					profile={props.profile}
// 					status={props.status}
// 					updateUserStatus={props.updateUserStatus}
// 				/>
// 				<div className={styles.info_employmentStatus}>
// 					<b>{props.profile.lookingForAJob ? 'Looking for a job!' : "I'm already employed"}</b>
// 				</div>
// 				<div className={styles.info_skills}>
// 					<b>Sklills:</b> {props.profile.lookingForAJobDescription}
// 				</div>
// 				<div className={styles.info_aboutMe}>
// 					<b>About me:</b> {props.profile.aboutMe}
// 				</div>
// 			</div>

// 			<div className={styles.contacts}>
// 				<div className={styles.contacts_title}>Contacts:</div>
// 				<div className={styles.contacts_block}>
// 					{Object.keys(props.profile.contacts).map(key => {
// 						return (
// 							<Contacts key={key} contactTitle={key} contactValue={props.profile.contacts[key]} />
// 						);
// 					})}
// 				</div>
// 			</div>
// 		</>
// 	);
// };

export default ProfileInfo;
