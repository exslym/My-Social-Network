import React, { useState, useEffect, ChangeEvent } from 'react';
import { ProfileType } from '../../../types/types';
// import { maxLengthCreator } from '../../../utils/validators/validators';
import styles from './ProfileInfo.module.scss';

//* TYPES:
type PropsType = {
	profile: ProfileType;
	status: string;
	updateUserStatus: (status: string) => void;
};

// const maxLength40 = maxLengthCreator(40);

const ProfileStatusWithHooks: React.FC<PropsType> = props => {
	let [editMode, setEditMode] = useState(false);
	let [status, setStatus] = useState(props.status);

	useEffect(() => {
		setStatus(props.status);
	}, [props.status]);

	const activateEditMode = () => {
		setEditMode(true);
		// setTimeout(() => {
		// 	document.querySelector('#mainStatusInput')?.select();
		// }, 300);
	};

	const deactivateEditMode = () => {
		setEditMode(false);
		props.updateUserStatus(status);
	};

	const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
		setStatus(e.currentTarget.value);
	};

	return (
		<>
			{!editMode ? (
				<div className={styles.info_status} onClick={activateEditMode}>
					<b>status:</b> {props.status || 'write something'}
				</div>
			) : (
				<input
					id='mainStatusInput'
					className={styles.info_status}
					autoFocus
					// validate={[maxLength40]}
					onChange={onStatusChange}
					onBlur={deactivateEditMode}
					defaultValue={status}
				/>
			)}
		</>
	);
};

export default ProfileStatusWithHooks;
