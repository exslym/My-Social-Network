import React from 'react';
import styles from '../MyPosts.module.scss';
import { reduxForm, Field } from 'redux-form';
import { CustomFormValidator } from '../../../commons/FormsControl/FormsControl';
import { maxLengthCreator, required } from '../../../../utils/validators/validators';

const AddNewPostForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<Field
				component={CustomFormValidator}
				// component={Textarea}
				name='newPostText'
				placeholder='Enter your message'
				className={styles.textarea}
				validate={[required, maxLengthCreator(20)]}
				type='textarea'
			/>
			<button className={styles.button}>Add post</button>
		</form>
	);
};

export const AddNewPostReduxForm = reduxForm({ form: 'ProfileAddNewPostForm' })(AddNewPostForm);
