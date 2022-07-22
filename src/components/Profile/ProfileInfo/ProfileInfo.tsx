import React, { ChangeEvent, useState } from 'react';
import Preloader from '../../commons/Preloader/Preloader';
import styles from './ProfileInfo.module.scss';
import avatar from '../../../assets/avatar-wh.png';
import ProfileDataForm from './ProfileDataForm';
import ProfileData from './ProfileData';
import type { ProfileType } from '../../../types/types';
// import ProfileStatus from './ProfileStatus';
// import ProfileStatusWithHooks from './ProfileStatusWithHooks';
// import Contacts from './Contacts';

//* TYPES:
type PropsType = {
	profile: ProfileType | null;
	status: string;
	updateUserStatus: (status: string) => void;
	isOwner: boolean;
	savePhoto: (file: File) => void;
	saveProfile: (profile: ProfileType) => Promise<any>;
};

const ProfileInfo: React.FC<PropsType> = ({
	profile,
	status,
	updateUserStatus,
	isOwner,
	savePhoto,
	saveProfile,
}) => {
	let [editMode, setEditMode] = useState(false);

	// let [initialValue, setValues] = useState(props.profile);

	// useEffect(() => {
	// 	setValues(props.profile);
	// }, [props.profile]);

	if (!profile) {
		return <Preloader />;
	}

	const onAvatarSelected = (e: ChangeEvent<HTMLInputElement>) => {
		// if (e.target.files && e.target.files.length) {
		// 	savePhoto(e.target.files[0]);
		// }
		if (e.target.files?.length) {
			savePhoto(e.target.files[0]);
		}
	};
	const uploadPhoto = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		document.getElementById('avatarInput')?.click();
	};

	const onSubmit = (formData: ProfileType) => {
		//! todo: remove then
		saveProfile(formData).then(() => {
			setEditMode(false);
		});
	};

	return (
		<div className={styles.content}>
			<img
				className={styles.avatar}
				src={profile.photos.large ? profile.photos.large : avatar}
				alt='avatar'
			/>
			{isOwner && (
				<>
					<input
						id='avatarInput'
						className={styles.fileloader}
						type={'file'}
						onChange={onAvatarSelected}
					/>
					<div
						className={styles.fileloaderButton}
						onClick={uploadPhoto as unknown as React.MouseEventHandler<HTMLDivElement>}
					>
						&#10047; <span className={styles.tooltip}>Upload photo</span>
					</div>
				</>
			)}

			{editMode ? (
				<ProfileDataForm
					initialValues={profile}
					profile={profile}
					status={status}
					updateUserStatus={updateUserStatus}
					isOwner={isOwner}
					onSubmit={onSubmit}
				/>
			) : (
				<ProfileData
					profile={profile}
					status={status}
					updateUserStatus={updateUserStatus}
					isOwner={isOwner}
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
