import React from 'react';
import styles from './ProfileInfo.module.scss';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import Contacts from './Contacts';
import type { ContactsType, ProfileType } from '../../../types/types';

//* TYPES:
type ProfileDataPropsType = {
	profile: ProfileType;
	goToEditMode: () => void;
	isOwner: boolean;
	status: string;
	updateUserStatus: (status: string) => void;
};

const ProfileData: React.FC<ProfileDataPropsType> = ({
	profile,
	isOwner,
	goToEditMode,
	status,
	updateUserStatus,
}) => {
	return (
		<>
			{isOwner && (
				<button className={styles.editButton} onClick={goToEditMode}>
					edit mode
				</button>
			)}
			<div className={styles.info}>
				<div className={styles.info_username}>{profile.fullName}</div>
				<ProfileStatusWithHooks
					profile={profile}
					status={status}
					updateUserStatus={updateUserStatus}
				/>

				<div className={styles.info_employmentStatus}>
					<b>employment: </b>
					{profile.lookingForAJob ? 'Looking for a job!' : "I'm already employed"}
				</div>
				<div className={styles.info_skills}>
					<b>skills:</b> {profile.lookingForAJobDescription}
				</div>
				<div className={styles.info_aboutMe}>
					<b>about me:</b> {profile.aboutMe}
				</div>

				<div className={styles.contacts}>
					<div className={styles.contacts_title}>contacts:</div>
					<div className={styles.contacts_block}>
						{Object.keys(profile.contacts).map(key => {
							return (
								<Contacts
									key={key}
									contactTitle={key}
									contactValue={profile.contacts[key as keyof ContactsType]}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfileData;
