// @ts-nocheck
import React, { useState } from 'react';
import styles from './ProfileInfo.module.scss';

const ProfileStatusWithHooks = props => {
	let [editMode, setEditMode] = useState(false);
	let [status, setStatus] = useState(props.status);

	const activateEditMode = () => {
		setEditMode(true);
	};

	const deactivateEditMode = () => {
		setEditMode(false);
		props.updateUserStatus(status);
	};

	const onStatusChange = e => {
		setStatus(e.currentTarget.value);
	};

	return (
		<div className={styles.app_profile_content}>
			<div className={styles.info}>
				<div className={styles.info_employmentStatus}>
					{props.profile.lookingForAJob ? 'трудоустроен' : 'ищу работу'}
				</div>
				{!editMode ? (
					<div className={styles.info_status} onDoubleClick={activateEditMode}>
						{props.status || 'write something'}
					</div>
				) : (
					<input
						className={styles.info_status}
						autoFocus
						onChange={onStatusChange}
						onBlur={deactivateEditMode}
						defaultValue={status}
					/>
				)}
			</div>
		</div>
	);
};

export default ProfileStatusWithHooks;
