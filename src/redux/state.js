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
	//
	addPost() {
		let newPost = {
			id: 5,
			post: this._state.profilePage.newPostText,
			likesCount: 0,
		};
		this._state.profilePage.posts.push(newPost);
		this._state.profilePage.newPostText = '';
		this._callSubscriber(this._state);
	},
	updateNewPostText(newText) {
		this._state.profilePage.newPostText = newText;
		this._callSubscriber(this._state);
	},
	// dispatch(action) {
	// 	if (action.type === 'ADD-POST') {
	// 		let newPost = {
	// 			id: 5,
	// 			post: this._state.profilePage.newPostText,
	// 			likesCount: 0,
	// 		};
	// 		this._state.profilePage.posts.push(newPost);
	// 		this._state.profilePage.newPostText = '';
	// 		this._callSubscriber(this._state);
	// 	} else if (action.type === 'UPDATE-NEW-POST-TEXT') {
	// 		this._state.profilePage.newPostText = action.newText;
	// 		this._callSubscriber(this._state);
	// 	}
	// },
};

export default store;

window.store = store;
