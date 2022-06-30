// import { createAction, createReducer } from '@reduxjs/toolkit';
const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
	dialogs: [
		{
			id: 1,
			name: 'Andrey',
			avatar: 'avatar1.png',
		},
		{
			id: 2,
			name: 'Michael',
			avatar: 'avatar2.png',
		},
		{
			id: 3,
			name: 'John',
			avatar: 'avatar3.png',
		},
		{
			id: 4,
			name: 'Vika',
			avatar: 'avatar4.png',
		},
		{
			id: 5,
			name: 'Viktor',
			avatar: 'avatar5.png',
		},
	],
	messages: [
		{ id: 1, message: 'Hi' },
		{ id: 2, message: 'How are you doing?' },
		{ id: 3, message: "Let's go out" },
		{ id: 4, message: "I'm busy" },
		{ id: 5, message: 'Bye!' },
	],
};

const dialogsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SEND_MESSAGE:
			let newMessage = {
				id: 6,
				message: action.newMessageBody,
			};
			return {
				...state,
				messages: [...state.messages, newMessage],
			};

		default:
			return state;
	}
};

// ActionCreator:
export const sendMessageActionCreator = newMessageBody => ({ type: SEND_MESSAGE, newMessageBody });

export default dialogsReducer;
