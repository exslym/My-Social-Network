import React from 'react';
import styles from '../MyPosts.module.scss';
import { reduxForm, Field } from 'redux-form';
// import { FormValidator } from '../../../commons/FormControl/FormControl';
import { Textarea } from '../../../commons/FormControl/FormControl';
import { maxLengthCreator, required } from '../../../../utils/validators/validators';

const maxLength20 = maxLengthCreator(20);

const AddNewPostForm = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<Field
				// component={FormValidator}
				component={Textarea}
				name='newPostText'
				placeholder='Enter your message'
				className={styles.textarea}
				validate={[required, maxLength20]}
				type='textarea'
			/>
			<button className={styles.button}>Add post</button>
		</form>
	);
};

export const AddNewPostReduxForm = reduxForm({ form: 'ProfileAddNewPostForm' })(AddNewPostForm);
