import React from 'react';
import styles from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = props => {
	return (
		<div className={styles.app_profile}>
			<ProfileInfo />
			<MyPostsContainer store={props.store} />
		</div>
	);
};

export default Profile;
