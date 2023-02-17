import React from 'react';
import styles from '../../Styles.module.scss';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
// import styles from './Dialogs.module.scss';
// import { Navigate } from 'react-router-dom';
// import AddMessageReduxForm  from './AddMessageForm/AddMessageForm';
import type { InitialStateType } from '../../redux/dialogs-reducer';
import AddMessageForm from './AddMessageForm/AddMessageForm';

//* TYPES:
type PropsType = {
	dialogsPage: InitialStateType;
	// isAuth: boolean;
	sendMessage: (newMessageBody: string) => void;
};
export type AddMessageFormValuesType = {
	newMessageBody: string;
};

const Dialogs: React.FC<PropsType> = props => {
	let state = props.dialogsPage;

	let messagesElements = state.messages.map(m => <Message key={m.id} message={m.message} />);
	let dialogsElements = state.dialogs.map(d => (
		<DialogItem key={d.id} avatar={d.avatar} name={d.name} id={d.id} />
	));
	let addNewMessage = (values: AddMessageFormValuesType) => {
		props.sendMessage(values.newMessageBody);
	};

	// if (!props.isAuth) return <Navigate to={'/login'} />;
	return (
		<div className={styles.Dialogs}>
			<div className={styles.Dialogs_items}>{dialogsElements}</div>
			<div className={styles.Dialogs_messages}>{messagesElements}</div>
			<AddMessageForm onSubmit={addNewMessage} />
			{/* <AddMessageReduxForm onSubmit={addNewMessage} /> */}
		</div>
	);
};

export default Dialogs;
