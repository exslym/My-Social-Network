// import React from 'react';
import {
	sendMessageActionCreator,
	updateNewMessageBodyActionCreator,
} from '../../redux/dialogs-reducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import Dialogs from './Dialogs';

const mapStateToProps = state => {
	return {
		dialogs: state.dialogsPage.dialogs,
		messages: state.dialogsPage.messages,
		newMessageBody: state.dialogsPage.newMessageBody,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		sendMessage: () => {
			dispatch(sendMessageActionCreator());
		},
		updateNewMessageBody: body => {
			let action = updateNewMessageBodyActionCreator(body);
			dispatch(action);
		},
	};
};

// let AuthRedirectComponent = withAuthRedirect(Dialogs);
// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);
// export default DialogsContainer;
export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs);
