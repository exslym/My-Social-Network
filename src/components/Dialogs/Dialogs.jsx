import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import styles from './Dialogs.module.css';

const Dialogs = props => {
	let dialogsElements = props.dialogs.map(d => <DialogItem name={d.name} id={d.id} />);
	let messagesElements = props.messages.map(m => <Message message={m.message} />);

	return (
		<div className={styles.app_dialogs}>
			<div className={styles.app_dialogs_items}>{dialogsElements}</div>
			<div className={styles.app_dialogs_messages}>{messagesElements}</div>
		</div>
	);
};

export default Dialogs;
