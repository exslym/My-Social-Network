// @ts-nocheck
import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import styles from './Dialogs.module.css';

const Dialogs = props => {
	let dialogsElements = props.dialogs.map(d => (
		<DialogItem avatar={d.avatar} name={d.name} id={d.id} key={d.id} />
	));
	let messagesElements = props.messages.map(m => <Message message={m.message} key={m.id} />);

	let newMessageBody = props.newMessageBody;

	// let newMessageElement = React.createRef();

	let onNewMessageChange = e => {
		let body = e.target.value;
		// let body = newMessageElement.current.value;
		props.updateNewMessageBody(body);
	};
	let onSendMessageClick = () => {
		props.sendMessage();
	};

	return (
		<div className={styles.app_dialogs}>
			<div className={styles.app_dialogs_items}>{dialogsElements}</div>
			<div className={styles.app_dialogs_messages}>{messagesElements}</div>

			<div className={styles.app_dialogs_newMessage}>
				<textarea
					placeholder='Enter your message'
					onChange={onNewMessageChange}
					// ref={newMessageElement}
					value={newMessageBody}
					className={styles.textarea}
				/>
				<button onClick={onSendMessageClick} className={styles.button}>
					Send
				</button>
			</div>
		</div>
	);
};

export default Dialogs;
