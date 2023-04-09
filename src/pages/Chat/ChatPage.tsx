import { Spin } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ChatMessageAPIType } from '../../api/chat-api';
import { selectIsAuth } from '../../redux/auth-selectors';
import {
	sendMessage,
	startMessagesListening,
	stopMessagesListening,
} from '../../redux/chat-reducer';
import store, { AppStateGlobalType } from '../../redux/redux-store';
import { TextAreaOrInputOnChangeType } from '../../types/types';
import { outputDateSeconds } from '../../utils/object-helpers';
import styles from './ChatPage.module.scss';

type AppAction = ReturnType<typeof store.dispatch>;
export type AppDispatch = ThunkDispatch<AppStateGlobalType, any, AppAction>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

const ChatPage: React.FC = () => {
	const isAuth = useSelector(selectIsAuth);

	return (
		<div style={{ padding: '10px', height: '100%', background: 'white' }}>
			{isAuth ? <Chat /> : <AddMessageForm isAuth={isAuth} />}
		</div>
	);
};

const Chat: React.FC = () => {
	const dispatch = useAppDispatch();
	const status = useSelector((state: AppStateGlobalType) => state.chat.status);

	useEffect(() => {
		dispatch(startMessagesListening());
		return () => {
			dispatch(stopMessagesListening());
		};
	}, [dispatch]);

	return (
		<div
			style={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
			}}
		>
			{status === 'error' && <div>Some error occured. Please refresh page</div>}
			<>
				<Messages />
				<AddMessageForm isAuth={true} />
			</>
		</div>
	);
};

const Messages: React.FC = () => {
	const messages = useSelector((state: AppStateGlobalType) => state.chat.messages);
	const messagesAnchorRef = useRef<HTMLDivElement>(null);
	const [isAutoScroll, setIsAutoScroll] = useState(true);

	const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
		const element = e?.currentTarget;
		let differenceWhatWeSee = element.scrollHeight - element.scrollTop;
		let value = Math.abs(differenceWhatWeSee - element.clientHeight);

		if (value < 200) {
			!isAutoScroll && setIsAutoScroll(true);
		} else {
			isAutoScroll && setIsAutoScroll(false);
		}
	};
	useEffect(() => {
		if (isAutoScroll) {
			messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
		}
	}, [isAutoScroll, messages]);

	return (
		<div
			className={styles.messagesBlock}
			style={{ height: '100%', overflowY: 'auto', marginBottom: '10px' }}
			onScroll={scrollHandler}
		>
			{messages.map((m, index) => (
				<Message key={m.id} message={m} />
			))}
			<div ref={messagesAnchorRef}></div>
		</div>
	);
};

const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({ message }) => {
	let avatarSrc = require(`../../assets/avatar.png`);
	return (
		<div>
			{message.photo ? (
				<img
					src={message.photo}
					alt=''
					style={{ width: '30px', borderRadius: '50%', marginRight: '10px' }}
				/>
			) : (
				<img
					src={avatarSrc}
					alt=''
					style={{ width: '30px', borderRadius: '50%', marginRight: '10px' }}
				/>
			)}

			<span>
				<strong>{message.userName}</strong>
			</span>
			<p>{message.message}</p>
			<div
				style={{
					margin: '1em 0',
					width: 'calc(100% - 10px)',
					height: '2px',
					background: 'rgba(0, 0, 0, 0.1)',
				}}
			></div>
		</div>
	);
});

const AddMessageForm: React.FC<{ isAuth: boolean }> = ({ isAuth }) => {
	const [message, setMessage] = useState('');
	const dispatch = useAppDispatch();

	const status = useSelector((state: AppStateGlobalType) => state.chat.status);

	// const sendMessageHandler = () => {
	// 	if (!message) {
	// 		return;
	// 	}
	// 	dispatch(sendMessage(message));
	// 	setMessage('');
	// };

	//region Description
	const onChangeTextArea = (event: TextAreaOrInputOnChangeType) => {
		setMessage(event.target.value);
	};

	const onSendMassagesButton = () => {
		onSendMessage();
	};

	const isDisabledButton = status !== 'ready';

	const onKeyPressInTextArea = (event: any) => {
		if (event.ctrlKey && event.code === 'Enter') {
			if (isDisabledButton) {
				console.log('хотел отправить сообщение через Ctrl + Enter в момент подключения');
				return;
			} else {
				onSendMessage();
			}
		}
	};

	const onSendMessage = () => {
		if (!message) {
			alert('Пустое сообщение невозможно отправить!');
			return;
		}

		const date = new Date();
		const time = String(date.getHours() + ':' + date.getMinutes());

		const messageWithTime = `${message} [${time}]`;

		if (messageWithTime.length > 100) {
			alert(
				`Можно отправлять не более 100 знаков,
            а сейчас уже ${messageWithTime.length}`,
			);
			return;
		}

		console.log('отправили сообщение', outputDateSeconds());

		dispatch(sendMessage(messageWithTime));

		setMessage('');
	};

	const placeholderText = `Press Ctrl + Enter to send a message or button "Send".\nYou can't send more than 100 symbols.`;
	//endregion

	return (
		<>
			<div className={styles.messageForm}>
				{isAuth ? (
					<>
						<div>
							<textarea
								onChange={onChangeTextArea}
								value={message}
								placeholder={placeholderText}
								onKeyPress={onKeyPressInTextArea}
							></textarea>
						</div>

						<div>
							{isDisabledButton ? (
								<Spin className={styles.spinner} />
							) : (
								<button onClick={onSendMassagesButton}>Send</button>
							)}
						</div>
					</>
				) : (
					<>
						<p className={styles.notLogged}>
							Chat works only for authorized users!
							<br />
							Please login
						</p>
					</>
				)}
			</div>
		</>
	);
};

export default ChatPage;
