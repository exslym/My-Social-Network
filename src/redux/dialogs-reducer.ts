import { InferActionsTypes } from './redux-store';

//* TYPES:
export type initialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type DialogType = {
	id: number;
	name: string;
	avatar: string;
};
type MessageType = {
	id: number;
	message: string;
};

let initialState = {
	dialogs: [
		{ id: 1, name: 'Andrey', avatar: 'avatar1.png' },
		{ id: 2, name: 'Michael', avatar: 'avatar2.png' },
		{ id: 3, name: 'John', avatar: 'avatar3.png' },
		{ id: 4, name: 'Vika', avatar: 'avatar4.png' },
		{ id: 5, name: 'Viktor', avatar: 'avatar5.png' },
	] as Array<DialogType>,
	messages: [
		{ id: 1, message: 'Hi' },
		{ id: 2, message: 'How are you doing?' },
		{ id: 3, message: "Let's go out" },
		{ id: 4, message: "I'm busy" },
		{ id: 5, message: 'Bye!' },
	] as Array<MessageType>,
};

const dialogsReducer = (state = initialState, action: ActionsTypes): initialStateType => {
	switch (action.type) {
		case 'SN/DIALOGS/SEND_MESSAGE':
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

//* ACTION_CREATORS:
export const actions = {
	sendMessageActionCreator: (newMessageBody: string) =>
		({ type: 'SN/DIALOGS/SEND_MESSAGE', newMessageBody } as const),
};

export default dialogsReducer;
