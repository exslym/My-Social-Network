import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import styles from './Dialogs.module.css';
import { sendMessageCreator, updateNewMessageBodyCreator } from '../../redux/dialogs-reducer';

const Dialogs = props => {
	let dialogsPage = props.store.getState().dialogsPage;

	let dialogsElements = dialogsPage.dialogs.map(d => (
		<DialogItem avatar={d.avatar} name={d.name} id={d.id} key={d.id} />
	));
	let messagesElements = dialogsPage.messages.map(m => <Message message={m.message} key={m.id} />);
	let newMessageBody = dialogsPage.newMessageBody;

	let onNewMessageChange = e => {
		let body = e.target.value;
		props.store.dispatch(updateNewMessageBodyCreator(body));
	};
	let onSendMessageClick = () => {
		props.store.dispatch(sendMessageCreator());
	};

	// let newMessageElement = React.createRef();
	// let sendMessage = () => {
	// 	let text = newMessageElement.current.value;
	// 	props.sendMessage(text);
	// };

	return (
		<div className={styles.app_dialogs}>
			<div className={styles.app_dialogs_items}>{dialogsElements}</div>
			<div className={styles.app_dialogs_messages}>{messagesElements}</div>

			<div className={styles.app_dialogs_newMessage}>
				<textarea
					value={newMessageBody}
					onChange={onNewMessageChange}
					// ref={newMessageElement}
					placeholder='Enter your message'
					className={styles.textarea}
				/>
				<button
					// onClick={sendMessage}
					onClick={onSendMessageClick}
					className={styles.button}
				>
					Send
				</button>
			</div>
		</div>
	);
};

export default Dialogs;
