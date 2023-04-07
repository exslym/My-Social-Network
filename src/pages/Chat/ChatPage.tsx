import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ChatMessageType } from '../../api/chat-api';
import {
	sendMessage,
	startMessagesListening,
	stopMessagesListening,
} from '../../redux/chat-reducer';
import store, { AppStateGlobalType } from '../../redux/redux-store';

type AppAction = ReturnType<typeof store.dispatch>;
export type AppDispatch = ThunkDispatch<AppStateGlobalType, any, AppAction>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

const ChatPage: React.FC = () => {
	return (
		<div style={{ padding: '10px', height: '100%', background: 'white' }}>
			<Chat />
		</div>
	);
};

const Chat: React.FC = () => {
	const dispatch = useAppDispatch();

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
			<Messages />
			<AddMessageForm />
		</div>
	);
};

const Messages: React.FC<{}> = () => {
	const messages = useSelector((state: AppStateGlobalType) => state.chat.messages);

	return (
		<div style={{ maxHeight: '440px', height: '100%', overflowY: 'auto', marginBottom: '10px' }}>
			{messages.map((m, index) => (
				<Message key={index} message={m} />
			))}
		</div>
	);
};

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
	return (
		<div>
			<img
				src={message.photo}
				alt=''
				style={{ width: '30px', borderRadius: '50%', marginRight: '10px' }}
			/>
			<span>
				<strong>{message.userName}</strong>
			</span>
			<p style={{ margin: '10px 0 0 40px' }}>{message.message}</p>
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
};

const AddMessageForm: React.FC<{}> = () => {
	const [message, setMessage] = useState('');
	const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending');

	const dispatch = useAppDispatch();

	const sendMessageHandler = () => {
		if (!message) {
			return;
		}
		dispatch(sendMessage(message));
		setMessage('');
	};

	return (
		<>
			<div>
				<textarea
					style={{ width: '50%', borderRadius: '5px', overflowY: 'auto' }}
					onChange={e => {
						setMessage(e.currentTarget.value);
					}}
					value={message}
				></textarea>
			</div>
			<div>
				<button disabled={false} onClick={sendMessageHandler}>
					Send
				</button>
			</div>
		</>
	);
};

export default ChatPage;
