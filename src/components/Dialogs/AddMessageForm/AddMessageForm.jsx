import React from 'react';
import styles from '../../Dialogs/Dialogs.module.scss';
import { reduxForm, Field } from 'redux-form';
// import { FormValidator } from '../../commons/FormControl/FormControl';
import { Textarea } from '../../commons/FormControl/FormControl';
import { maxLengthCreator, required } from '../../../utils/validators/validators';

const maxLength300 = maxLengthCreator(300);

const AddMessageForm = props => {
	return (
		<form onSubmit={props.handleSubmit} className={styles.app_dialogs_newMessage}>
			<Field
				// component={FormValidator}
				component={Textarea}
				name='newMessageBody'
				placeholder='Enter your message'
				className={styles.app_dialogs_textarea}
				validate={[required, maxLength300]}
				type='textarea'
			/>
			<button className={styles.app_dialogs_button}>Send</button>
		</form>
	);
};

export const AddMessageReduxForm = reduxForm({
	form: 'dialogAddMessageForm',
})(AddMessageForm);
