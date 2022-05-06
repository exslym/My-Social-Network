import React from 'react';
import Dialogs from './Dialogs';
import { sendMessageCreator, updateNewMessageBodyCreator } from '../../redux/dialogs-reducer';

const DialogContainer = props => {
	let dialogsPage = props.store.getState().dialogsPage;

	let onNewMessageChange = body => {
		props.store.dispatch(updateNewMessageBodyCreator(body));
	};

	let onSendMessageClick = () => {
		props.store.dispatch(sendMessageCreator());
	};

	return (
		<Dialogs
			updateNewMessageBody={onNewMessageChange}
			sendMessage={onSendMessageClick}
			dialogs={dialogsPage.dialogs}
			messages={dialogsPage.messages}
		/>
	);
};

export default DialogContainer;
