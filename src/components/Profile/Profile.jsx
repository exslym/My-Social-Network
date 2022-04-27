import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import styles from './Profile.module.css';

const Profile = () => {
	return (
		<div className={styles.app_profile}>
			<ProfileInfo />
			<MyPosts />
		</div>
	);
};

export default Profile;
