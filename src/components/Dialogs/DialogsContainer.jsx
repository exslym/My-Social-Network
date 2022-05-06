// import React from 'react';
import Dialogs from './Dialogs';
import { sendMessageCreator, updateNewMessageBodyCreator } from '../../redux/dialogs-reducer';
import { connect } from 'react-redux';

const mapStateToProps = state => {
	return {
		dialogs: state.dialogsPage.dialogs,
		messages: state.dialogsPage.messages,
		newMessageBody: state.dialogsPage.newMessageBody,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		updateNewMessageBody: body => {
			let action = updateNewMessageBodyCreator(body);
			dispatch(action);
		},
		sendMessage: () => {
			dispatch(sendMessageCreator());
		},
	};
};
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
