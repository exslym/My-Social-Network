import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import styles from './Profile.module.css';

const Profile = () => {
	return (
		<div className={styles.app_profile}>
			<header className={styles.header}>Profile</header>
			<MyPosts />
		</div>
	);
};

export default Profile;
