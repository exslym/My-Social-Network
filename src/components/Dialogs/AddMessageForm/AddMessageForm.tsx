import React from 'react';
// import styles from '../../Dialogs/Dialogs.module.scss';
import { InjectedFormProps, reduxForm } from 'redux-form';
import styles from '../../../Styles.module.scss';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { createField, Textarea } from '../../commons/FormControl/FormControl';
import type { AddMessageFormValuesType } from '../Dialogs';

//* TYPES:
type AddMessageFormValuesTypeKeys = Extract<keyof AddMessageFormValuesType, string>;
type PropsType = {};

const maxLength300 = maxLengthCreator(300);
const AddMessageForm: React.FC<
	InjectedFormProps<AddMessageFormValuesType, PropsType> & PropsType
> = props => {
	return (
		<form onSubmit={props.handleSubmit} className={styles.Dialogs_newMessage}>
			{createField<AddMessageFormValuesTypeKeys>(
				'Enter your message',
				'newMessageBody',
				[required, maxLength300],
				Textarea,
				{
					type: 'input',
				},
			)}
			{/* <Field
				component={Textarea}
				name='newMessageBody'
				placeholder='Enter your message'
				className={styles.app_dialogs_textarea}
				validate={[required, maxLength300]}
				type='textarea'
			/> */}
			<button className={styles.Dialogs_button}>Send</button>
		</form>
	);
};

/* export const AddMessageReduxForm = reduxForm({
	form: 'dialogAddMessageForm',
})(AddMessageForm); */
export default reduxForm<AddMessageFormValuesType, PropsType>({
	form: 'dialog-add-message-form',
})(AddMessageForm);
