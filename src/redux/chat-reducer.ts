import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { FormAction } from 'redux-form';
import { ThunkDispatch } from 'redux-thunk';
import { ChatMessageType, StatusType, chatAPI } from '../api/chat-api';
import type { AppStateGlobalType, BaseThunkType, InferActionsTypes } from './redux-store';

//* TYPES:
export type InitialStateType = typeof initialState;
export type ThunkType = BaseThunkType<ActionsTypes | FormAction>;
type ActionsTypes = InferActionsTypes<typeof actions>;

//* Typed DISPATCH:
export type TypedDispatch = ThunkDispatch<AppStateGlobalType, any, ActionsTypes>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();

let initialState = {
	messages: [] as ChatMessageType[],
	status: 'pending' as StatusType,
};

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case 'SN/chat/MESSAGES_RECEIVED':
			return {
				...state,
				messages: [...state.messages, ...action.payload.messages],
			};
		case 'SN/chat/STATUS_CHANGED':
			return {
				...state,
				status: action.payload.status,
			};
		default:
			return state;
	}
};

//* ACTION_CREATORS:
export const actions = {
	messagesReceived: (messages: ChatMessageType[]) =>
		({ type: 'SN/chat/MESSAGES_RECEIVED', payload: { messages } } as const),
	statusChanged: (status: StatusType) =>
		({ type: 'SN/chat/STATUS_CHANGED', payload: { status } } as const),
};

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;
const newMessageHandlerCreator = (dispatch: Dispatch) => {
	if (_newMessageHandler === null) {
		_newMessageHandler = messages => {
			dispatch(actions.messagesReceived(messages));
		};
	}
	return _newMessageHandler;
};

let _statusChangedHandler: ((status: StatusType) => void) | null = null;
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
	if (_statusChangedHandler === null) {
		_statusChangedHandler = status => {
			dispatch(actions.statusChanged(status));
		};
	}
	return _statusChangedHandler;
};

//* THUNKS:
export const startMessagesListening = (): ThunkType => async dispatch => {
	chatAPI.start();
	chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch));
	chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch));
};
export const stopMessagesListening = (): ThunkType => async dispatch => {
	chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch));
	chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch));
	chatAPI.stop();
};
export const sendMessage =
	(message: string): ThunkType =>
	async () => {
		chatAPI.sendMessage(message);
	};

export default chatReducer;
