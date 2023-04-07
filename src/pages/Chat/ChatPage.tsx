import React, { useEffect, useState } from 'react';

export type ChatMessageType = {
	message: string;
	photo: string;
	userId: number;
	userName: string;
};

const ChatPage: React.FC = () => {
	return (
		<div style={{ padding: '10px', height: '100%', background: 'white' }}>
			<Chat />
		</div>
	);
};

const Chat: React.FC = () => {
	const [wsChannel, setWsChannel] = useState<WebSocket | null>(null);

	useEffect(() => {
		let ws: WebSocket;
		const closeHandler = () => {
			console.log('CLOSE WS');
			setTimeout(createChannel, 3000);
		};

		function createChannel() {
			ws?.removeEventListener('close', closeHandler);
			ws?.close();
			ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
			ws.addEventListener('close', closeHandler);
			setWsChannel(ws);
		}
		createChannel();

		return () => {
			ws.removeEventListener('close', closeHandler);
			ws.close();
		};
	}, []);

	return (
		<div
			style={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
			}}
		>
			<Messages wsChannel={wsChannel} />
			<AddMessageForm wsChannel={wsChannel} />
		</div>
	);
};

const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
	const [messages, setMessages] = useState<ChatMessageType[]>([]);

	useEffect(() => {
		let messageHandler = (e: MessageEvent) => {
			let newMessages = JSON.parse(e.data);
			setMessages(prevMessages => [...prevMessages, ...newMessages]);
		};

		wsChannel?.addEventListener('message', messageHandler);

		return () => {
			wsChannel?.removeEventListener('message', messageHandler);
		};
	}, [wsChannel]);

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

const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
	const [message, setMessage] = useState('');
	const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending');

	useEffect(() => {
		let openHandler = () => {
			setReadyStatus('ready');
		};

		wsChannel?.addEventListener('open', openHandler);

		return () => {
			wsChannel?.removeEventListener('open', openHandler);
		};
	}, [wsChannel]);

	const sendMessage = () => {
		if (!message) {
			return;
		}
		wsChannel?.send(message);
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
				<button disabled={wsChannel === null || readyStatus !== 'ready'} onClick={sendMessage}>
					Send
				</button>
			</div>
		</>
	);
};

export default ChatPage;
