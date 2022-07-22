import React from 'react';
import Dialogs from './Dialogs';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { actions } from '../../redux/dialogs-reducer';
import type { AppStateType } from '../../redux/redux-store';

const mapStateToProps = (state: AppStateType) => {
	return {
		dialogsPage: state.dialogsPage,
		// dialogs: state.dialogsPage.dialogs,
		// messages: state.dialogsPage.messages,
		// newMessageBody: state.dialogsPage.newMessageBody,
	};
};

/* const mapDispatchToProps = dispatch => {
	return {
		sendMessage: newMessageBody => {
			dispatch(actions.sendMessage(newMessageBody));
		},
	};
}; */

/* let AuthRedirectComponent = withAuthRedirect(Dialogs);
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);
export default DialogsContainer; */
export default compose<React.ComponentType>(
	connect(mapStateToProps, { ...actions }),
	withAuthRedirect,
)(Dialogs);
