// @ts-nocheck
import React from 'react';
import styles from './ProfileInfo.module.scss';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import Contacts from './Contacts';

const ProfileData = props => {
	return (
		<>
			{props.isOwner && (
				<button className={styles.editButton} onClick={props.goToEditMode}>
					edit mode
				</button>
			)}
			<div className={styles.info}>
				<div className={styles.info_username}>{props.profile.fullName}</div>
				<ProfileStatusWithHooks
					profile={props.profile}
					status={props.status}
					updateUserStatus={props.updateUserStatus}
				/>
				<div className={styles.info_employmentStatus}>
					<b>employment: </b>
					{props.profile.lookingForAJob ? 'Looking for a job!' : "I'm already employed"}
				</div>
				<div className={styles.info_skills}>
					<b>skills:</b> {props.profile.lookingForAJobDescription}
				</div>
				<div className={styles.info_aboutMe}>
					<b>about me:</b> {props.profile.aboutMe}
				</div>

				<div className={styles.contacts}>
					<div className={styles.contacts_title}>contacts:</div>
					<div className={styles.contacts_block}>
						{Object.keys(props.profile.contacts).map(key => {
							return (
								<Contacts key={key} contactTitle={key} contactValue={props.profile.contacts[key]} />
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfileData;
