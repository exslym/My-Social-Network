// @ts-nocheck
import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import styles from './Dialogs.module.scss';
import { Navigate } from 'react-router-dom';

const Dialogs = props => {
	let dialogsElements = props.dialogs.map(d => (
		<DialogItem avatar={d.avatar} name={d.name} id={d.id} key={d.id} />
	));
	let messagesElements = props.messages.map(m => <Message message={m.message} key={m.id} />);
	let newMessageBody = props.newMessageBody;

	// let newMessageElement = React.createRef();
	let onSendMessageClick = () => {
		// let body = e.target.value;
		// if (body !== '') {
		// 	props.sendMessage();
		// }
		props.sendMessage();
	};
	let onNewMessageChange = e => {
		let body = e.target.value;
		// let body = newMessageElement.current.value;
		props.updateNewMessageBody(body);
	};

	if (!props.isAuth) return <Navigate to={'/login'} />;

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
					className={styles.app_dialogs_textarea}
				/>
				<button onClick={onSendMessageClick} className={styles.app_dialogs_button}>
					Send
				</button>
			</div>
		</div>
	);
};

export default Dialogs;
