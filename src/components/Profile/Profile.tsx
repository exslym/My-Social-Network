import React from 'react';
import styles from './Profile.module.scss';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import type { ProfileType } from '../../types/types';

//* TYPES:
type PropsType = {
	profile: ProfileType | null;
	status: string;
	updateUserStatus: (status: string) => void;
	isOwner: boolean;
	savePhoto: (file: File) => void;
	saveProfile: (profile: ProfileType) => Promise<any>;
};

const Profile: React.FC<PropsType> = props => {
	return (
		<div className={styles.profile}>
			<ProfileInfo
				profile={props.profile}
				status={props.status}
				updateUserStatus={props.updateUserStatus}
				isOwner={props.isOwner}
				savePhoto={props.savePhoto}
				saveProfile={props.saveProfile}
			/>
			<MyPostsContainer />
		</div>
	);
};

export default Profile;
