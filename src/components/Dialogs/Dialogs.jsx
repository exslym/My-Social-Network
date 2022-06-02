// @ts-nocheck
import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import styles from './Dialogs.module.scss';
import { Navigate } from 'react-router-dom';
import { AddMessageReduxForm } from './AddMessageForm/AddMessageForm';

const Dialogs = props => {
	let dialogsElements = props.dialogs.map(d => (
		<DialogItem avatar={d.avatar} name={d.name} id={d.id} key={d.id} />
	));

	let messagesElements = props.messages.map(m => <Message message={m.message} key={m.id} />);

	let addNewMessage = values => {
		props.sendMessage(values.newMessageBody);
	};

	if (!props.isAuth) return <Navigate to={'/login'} />;
	return (
		<div className={styles.app_dialogs}>
			<div className={styles.app_dialogs_items}>{dialogsElements}</div>
			<div className={styles.app_dialogs_messages}>{messagesElements}</div>
			<AddMessageReduxForm onSubmit={addNewMessage} />
		</div>
	);
};

export default Dialogs;
