import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import styles from './Profile.module.css';

const Profile = props => {
	return (
		<div className={styles.app_profile}>
			<ProfileInfo />

			<MyPosts
				posts={props.profilePage.posts}
				newPostText={props.profilePage.newPostText}
				addPost={props.addPost}
				updateNewPostText={props.updateNewPostText}
			/>
		</div>
	);
};

export default Profile;
