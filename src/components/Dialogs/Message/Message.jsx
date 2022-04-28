import React from 'react';
import styles from './Message.module.css';

const Message = props => {
	return (
		<div className={styles.app_dialogs_message}>
			<p>{props.message}</p>
		</div>
	);
};

export default Message;
