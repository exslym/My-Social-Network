import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ChatMessageAPIType } from '../../api/chat-api';
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
				<AddMessageForm />
			</>
		</div>
	);
};

const Messages: React.FC<{}> = () => {
	const messages = useSelector((state: AppStateGlobalType) => state.chat.messages);
	const messagesAnchorRef = useRef<HTMLDivElement>(null);
	const [isAutoScroll, setIsAutoScroll] = useState(true);

	const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
		const element = e?.currentTarget;
		if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 200) {
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
			style={{ maxHeight: '440px', height: '100%', overflowY: 'auto', marginBottom: '10px' }}
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
	return (
		<div>
			<img
				src={message.photo}
				alt=''
				style={{ width: '30px', borderRadius: '50%', marginRight: '10px' }}
			/>
			<span style={{ fontSize: '1.2em' }}>
				<strong>{message.userName}</strong>
			</span>
			<p style={{ margin: '5px 0 0 40px', fontSize: '1.2em' }}>{message.message}</p>
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

const AddMessageForm: React.FC<{}> = () => {
	const [message, setMessage] = useState('');
	const dispatch = useAppDispatch();

	const status = useSelector((state: AppStateGlobalType) => state.chat.status);

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
					style={{
						width: '50%',
						borderRadius: '5px',
						overflowY: 'auto',
						resize: 'none',
						border: '1px solid rgba(0, 0, 0, 0.25)',
						fontSize: '1.2em',
					}}
					onChange={e => {
						setMessage(e.currentTarget.value);
					}}
					value={message}
				></textarea>

				<button
					disabled={status !== 'ready'}
					onClick={sendMessageHandler}
					style={{ margin: '5px 0 0', fontSize: '1.2em' }}
				>
					Send
				</button>
			</div>
		</>
	);
};

export default ChatPage;
