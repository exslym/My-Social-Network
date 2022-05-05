import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';

let store = {
	_state: {
		profilePage: {
			posts: [
				{ id: 1, post: 'Hey, how r u doin?', likesCount: 5 },
				{ id: 2, post: 'My first post', likesCount: 10 },
				{ id: 3, post: 'My second post', likesCount: 25 },
			],
			newPostText: '',
		},
		dialogsPage: {
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
		},
		sideBar: {
			friends: [
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
		},
	},

	//
	_callSubscriber() {
		console.log('State changed');
	},

	//
	getState() {
		return this._state;
	},
	subscribe(observer) {
		this._callSubscriber = observer;
	},

	// dispatch:
	dispatch(action) {
		this._state.profilePage = profileReducer(this._state.profilePage, action);
		this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
		this._state.sideBar = sidebarReducer(this._state.sideBar, action);

		this._callSubscriber(this._state);
	},
};

export default store;

window.store = store;
