import React from 'react';
import styles from './Message.module.scss';

//* TYPES:
type PropsType = {
	message: string;
};

const Message: React.FC<PropsType> = props => {
	return (
		<div className={styles.app_dialogs_message}>
			{/* <p className={styles.app_dialogs_messageIn}>{props.message}</p> */}
			<p className={styles.app_dialogs_messageOut}>{props.message}</p>
		</div>
	);
};

export default Message;
