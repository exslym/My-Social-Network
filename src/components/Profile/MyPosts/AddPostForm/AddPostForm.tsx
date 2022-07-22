import React from 'react';
import styles from '../MyPosts.module.scss';
import { reduxForm, InjectedFormProps } from 'redux-form';
// import { FormValidator } from '../../../commons/FormControl/FormControl';
import { maxLengthCreator, required } from '../../../../utils/validators/validators';
import { createField, Textarea } from '../../../commons/FormControl/FormControl';
import type { GetStringKeys } from '../../../commons/FormControl/FormControl';

//* TYPES:
type PropsType = {};
export type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>;
export type AddPostFormValuesType = {
	newPostText: string;
};

const maxLength20 = maxLengthCreator(20);

const AddNewPostForm: React.FC<
	InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType
> = props => {
	return (
		<form onSubmit={props.handleSubmit} className={styles.postForm}>
			{createField<AddPostFormValuesTypeKeys>(
				'Enter your message',
				'newPostText',
				[required, maxLength20],
				Textarea,
			)}
			{/* <Field
				component={Textarea}
				name='newPostText'
				placeholder='Enter your message'
				className={styles.textarea}
				validate={[required, maxLength20]}
				type='textarea'
			/> */}
			<button className={styles.button}>Add post</button>
		</form>
	);
};

export default reduxForm<AddPostFormValuesType, PropsType>({ form: 'profile-add-post' })(
	AddNewPostForm,
);
