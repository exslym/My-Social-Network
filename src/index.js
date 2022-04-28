import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let dialogs = [
	{
		id: 1,
		name: 'Andrey',
	},
	{
		id: 2,
		name: 'Michael',
	},
	{
		id: 3,
		name: 'John',
	},
	{
		id: 4,
		name: 'Vika',
	},
	{
		id: 5,
		name: 'Viktor',
	},
];

let messages = [
	{ id: 1, message: 'Hi' },
	{ id: 2, message: 'How are you doing?' },
	{ id: 3, message: "Let's go out" },
	{ id: 4, message: "I'm busy" },
	{ id: 5, message: 'Bye!' },
];

let posts = [
	{ id: 1, post: 'Hey, how r u doin?', likesCount: 5 },
	{ id: 2, post: 'My first post', likesCount: 10 },
	{ id: 3, post: 'My second post', likesCount: 25 },
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App dialogs={dialogs} messages={messages} posts={posts} />
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
