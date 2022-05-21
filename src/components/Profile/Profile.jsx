// @ts-nocheck
import React from 'react';
import styles from './Profile.module.scss';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = props => {
	return (
		<div className={styles.app_profile}>
			<ProfileInfo profile={props.profile} />
			<MyPostsContainer />
		</div>
	);
};

export default Profile;
