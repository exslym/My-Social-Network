// @ts-nocheck
import React from 'react';
import avatar from '../assets/avatar.jpg';
import styles from './ProfileInfo.module.css';

const ProfileInfo = () => {
	return (
		<div className={styles.app_profile_content}>
			<img className={styles.avatar} src={avatar} alt='avatar' />
			<div className={styles.info}>
				<p className={styles.username}>exslym</p>
				<p className={styles.employment}>web-developer</p>
				<p className={styles.status}>learning React</p>
			</div>
		</div>
	);
};

export default ProfileInfo;
