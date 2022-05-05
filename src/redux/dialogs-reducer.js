import { createAction, createReducer } from '@reduxjs/toolkit';

const SEND_MESSAGE = createAction('SEND_MESSAGE');
const UPDATE_NEW_MESSAGE_BODY = createAction('UPDATE_NEW_MESSAGE_BODY');

// const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
// const SEND_MESSAGE = 'SEND_MESSAGE';

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
	newMessageBody: '',
};

const dialogsReducer = createReducer(initialState, builder => {
	builder
		.addCase(SEND_MESSAGE, (state, action) => {
			let body = state.newMessageBody;
			state.messages.push({ id: 6, message: body });
			state.newMessageBody = '';
			return state;
		})
		.addCase(UPDATE_NEW_MESSAGE_BODY, (state, action) => {
			state.newMessageBody = action.newBody;
			return state;
		})
		.addDefaultCase((state, action) => {
			return state;
		});
});

// const dialogsReducer = (state = initialState, action) => {
// 	switch (action.type) {
// 		case SEND_MESSAGE:
// 			let body = state.newMessageBody;
// 			state.messages.push({ id: 6, message: body });
// 			state.newMessageBody = '';
// 			return state;
// 		case UPDATE_NEW_MESSAGE_BODY:
// 			state.newMessageBody = action.newBody;
// 			return state;
// 		default:
// 			return state;
// 	}
// };

// ActionCreator:
export const sendMessageCreator = () => ({ type: 'SEND_MESSAGE' });
export const updateNewMessageBodyCreator = body => ({
	type: 'UPDATE_NEW_MESSAGE_BODY',
	newBody: body,
});
// export const sendMessageCreator = () => ({ type: SEND_MESSAGE });
// export const updateNewMessageBodyCreator = body => ({
// 	type: UPDATE_NEW_MESSAGE_BODY,
// 	newBody: body,
// });

export default dialogsReducer;
