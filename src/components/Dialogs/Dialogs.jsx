import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import styles from './Dialogs.module.css';

const Dialogs = props => {
	let dialogsElements = props.dialogsPage.dialogs.map(d => (
		<DialogItem avatar={d.avatar} name={d.name} id={d.id} key={d.id} />
	));
	let messagesElements = props.dialogsPage.messages.map(m => (
		<Message message={m.message} key={m.id} />
	));

	let newMessageElement = React.createRef();
	let sendMessage = () => {
		let text = newMessageElement.current.value;
		props.sendMessage(text);
	};

	return (
		<div className={styles.app_dialogs}>
			<div className={styles.app_dialogs_items}>{dialogsElements}</div>
			<div className={styles.app_dialogs_messages}>{messagesElements}</div>
			<div className={styles.app_dialogs_newMessage}>
				<textarea ref={newMessageElement} className={styles.textarea}></textarea>
				<button onClick={sendMessage} className={styles.button}>
					Send
				</button>
			</div>
		</div>
	);
};

export default Dialogs;
