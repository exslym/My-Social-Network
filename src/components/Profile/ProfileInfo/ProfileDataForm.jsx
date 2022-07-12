import React from 'react';
import { reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { createField, Input, Textarea } from '../../commons/FormControl/FormControl';
import styles from './ProfileInfo.module.scss';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
// import Contacts from './Contacts';

const maxLength50 = maxLengthCreator(50);
const maxLength100 = maxLengthCreator(100);
const maxLength200 = maxLengthCreator(200);

const ProfileDataReduxForm = props => {
	return (
		<form className={styles.info} onSubmit={props.handleSubmit}>
			{props.isOwner && <button className={styles.editButton}>save</button>}
			<div className={styles.info_username}>
				{/* <Field
						component={Input}
						name='fullName'
						placeholder='edit name'
						validate={[required, maxLength50]}
						type='input'
					/> */}
				{createField('edit name', 'fullName', [required, maxLength50], Input)}
			</div>
			<ProfileStatusWithHooks
				profile={props.profile}
				status={props.status}
				updateUserStatus={props.updateUserStatus}
			/>
			<div className={styles.info_employmentStatus}>
				{/* <Field
						component={Input}
						name='lookingForAJob'
						type='checkbox'
						id='lookingForAJob'
						className={styles.checkbox}
					/> */}
				{createField('', 'lookingForAJob', [], Input, { type: 'checkbox' })}
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
				{createField('my skills', 'lookingForAJobDescription', [required, maxLength100], Textarea)}
			</div>
			<div className={styles.info_aboutMe}>
				{/* <Field
						component={Textarea}
						name='aboutMe'
						placeholder='about me'
						validate={[required, maxLength200]}
						type='Textarea'
					/> */}
				{createField('about me', 'aboutMe', [required, maxLength200], Textarea)}
			</div>
			<div className={styles.contacts}>
				<div className={styles.contacts_title}>Contacts:</div>
				{props.error && <div className={styles.formSummaryError}>{props.error}</div>}
				<div className={styles.contacts_block}>
					{Object.keys(props.profile.contacts).map(key => {
						return (
							<div key={key} className={styles.contacts_item}>
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
const ProfileDataForm = reduxForm({
	form: 'edit-profile',
	enableReinitialize: true,
	destroyOnUnmount: false,
})(ProfileDataReduxForm);

export default ProfileDataForm;
