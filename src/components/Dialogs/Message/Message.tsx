import React from 'react';
import styles from '../../../Styles.module.scss';
// import styles from './Message.module.scss';

//* TYPES:
type PropsType = {
	message: string;
};

const Message: React.FC<PropsType> = props => {
	return (
		<div className={styles.Dialogs_message}>
			{/* <p className={styles.app_dialogs_messageIn}>{props.message}</p> */}
			<p className={styles.Dialogs_messageOut}>{props.message}</p>
		</div>
	);
};

export default Message;
