import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { createField, Input, Textarea } from '../../commons/FormControl/FormControl';
import styles from './ProfileInfo.module.scss';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import type { ProfileType } from '../../../types/types';
import type { GetStringKeys } from '../../commons/FormControl/FormControl';
// import Contacts from './Contacts';

const maxLength50 = maxLengthCreator(50);
const maxLength100 = maxLengthCreator(100);
const maxLength200 = maxLengthCreator(200);

//* TYPES:
type ProfileTypeKeys = GetStringKeys<ProfileType>;
type ProfileDataFormPropsType = {
	profile: ProfileType;
	isOwner: boolean;
	status: string;
	updateUserStatus: (status: string) => void;
};

const ProfileDataForm: React.FC<
	InjectedFormProps<ProfileType, ProfileDataFormPropsType> & ProfileDataFormPropsType
> = ({ handleSubmit, isOwner, profile, status, updateUserStatus, error }) => {
	return (
		<form className={styles.info} onSubmit={handleSubmit}>
			{isOwner && <button className={styles.editButton}>save</button>}
			<div className={styles.info_username}>
				{/* <Field
						component={Input}
						name='fullName'
						placeholder='edit name'
						validate={[required, maxLength50]}
						type='input'
					/> */}
				{createField<ProfileTypeKeys>('edit name', 'fullName', [required, maxLength50], Input)}
			</div>
			<ProfileStatusWithHooks
				profile={profile}
				status={status}
				updateUserStatus={updateUserStatus}
			/>
			<div className={styles.info_employmentStatus}>
				{/* <Field
						component={Input}
						name='lookingForAJob'
						type='checkbox'
						id='lookingForAJob'
						className={styles.checkbox}
					/> */}
				{createField<ProfileTypeKeys>('', 'lookingForAJob', [], Input, {
					type: 'checkbox',
				})}
				<label htmlFor='lookingForAJob'>Looking for a job!</label>
			</div>
			<div className={styles.info_skills}>
				{/* <Field
						component={Textarea}
						name='lookingForAJobDescription'
						placeholder='my skills'
						validate={[required, maxLength100]}
						type='textarea'
					/> */}
				{createField<ProfileTypeKeys>(
					'my skills',
					'lookingForAJobDescription',
					[required, maxLength100],
					Textarea,
				)}
			</div>
			<div className={styles.info_aboutMe}>
				{/* <Field
						component={Textarea}
						name='aboutMe'
						placeholder='about me'
						validate={[required, maxLength200]}
						type='Textarea'
					/> */}
				{createField<ProfileTypeKeys>('about me', 'aboutMe', [required, maxLength200], Textarea)}
			</div>
			<div className={styles.contacts}>
				<div className={styles.contacts_title}>Contacts:</div>
				{error && <div className={styles.formSummaryError}>{error}</div>}
				<div className={styles.contacts_block}>
					{Object.keys(profile.contacts).map(key => {
						return (
							<div key={key} className={styles.contacts_item}>
								{/* //! todo: create some solution for embedded objects */}
								{createField(`${key}.com`, 'contacts.' + key.toLocaleLowerCase(), [], Input)}
							</div>
						);
					})}
				</div>
			</div>
		</form>
	);
};

// export default ProfileDataForm;
export default reduxForm<ProfileType, ProfileDataFormPropsType>({
	form: 'edit-profile',
	enableReinitialize: true,
	destroyOnUnmount: false,
})(ProfileDataForm);

// export default ProfileDataForm;
