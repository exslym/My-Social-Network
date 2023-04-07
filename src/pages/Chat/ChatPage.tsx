import React, { useEffect, useState } from 'react';

const webSocketChannel = new WebSocket(
	'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx',
);

export type ChatMessageType = {
	message: string;
	photo: string;
	userId: number;
	userName: string;
};

const ChatPage: React.FC = () => {
	return (
		<div>
			<Chat />
		</div>
	);
};

const Chat: React.FC = () => {
	return (
		<div>
			<Messages />
			<AddMessageForm />
		</div>
	);
};

const Messages: React.FC = () => {
	const [messages, setMessages] = useState<ChatMessageType[]>([]);

	useEffect(() => {
		webSocketChannel.addEventListener('message', (e: MessageEvent) => {
			const newMessages = JSON.parse(e.data);
			setMessages(prevMessages => [...prevMessages, ...newMessages]);
		});
	}, []);

	return (
		<div style={{ height: '460px', overflowY: 'auto', marginBottom: '10px' }}>
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
			<hr />
		</div>
	);
};

const AddMessageForm: React.FC = () => {
	const [message, setMessage] = useState('');
	const sendMessage = () => {
		if (!message) {
			return;
		}
		webSocketChannel.send(message);
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
				<button onClick={sendMessage}>Send</button>
			</div>
		</>
	);
};

export default ChatPage;
