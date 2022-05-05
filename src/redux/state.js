const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

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

	// private:
	_addPost() {
		let newPost = {
			id: 5,
			post: this._state.profilePage.newPostText,
			likesCount: 0,
		};
		this._state.profilePage.posts.push(newPost);
		this._state.profilePage.newPostText = '';
		this._callSubscriber(this._state);
	},
	_updateNewPostText(newText) {
		this._state.profilePage.newPostText = newText;
		this._callSubscriber(this._state);
	},

	// dispatch:
	dispatch(action) {
		if (action.type === ADD_POST) {
			this._addPost();
			// let newPost = {
			// 	id: 5,
			// 	post: this._state.profilePage.newPostText,
			// 	likesCount: 0,
			// };
			// this._state.profilePage.posts.push(newPost);
			// this._state.profilePage.newPostText = '';
			// this._callSubscriber(this._state);
		} else if (action.type === UPDATE_NEW_POST_TEXT) {
			this._updateNewPostText(action.newText);
			// this._state.profilePage.newPostText = action.newText;
			// this._callSubscriber(this._state);
		}
	},
};

// ActionCreator:
export const addPostActionCreator = () => ({ type: ADD_POST });
export const updateNewPostTextActionCreator = text => ({
	type: UPDATE_NEW_POST_TEXT,
	newText: text,
});

export default store;

window.store = store;
