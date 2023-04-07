import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { actions } from '../../redux/dialogs-reducer';
import type { AppStateGlobalType } from '../../redux/redux-store';
import Dialogs from './Dialogs';

const mapStateToProps = (state: AppStateGlobalType) => {
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
