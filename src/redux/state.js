let state = {
	profilePage: {
		posts: [
			{ id: 1, post: 'Hey, how r u doin?', likesCount: 5 },
			{ id: 2, post: 'My first post', likesCount: 10 },
			{ id: 3, post: 'My second post', likesCount: 25 },
		],
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
};

export let addPost = postMessage => {
	let newPost = {
		id: 5,
		post: postMessage,
		likesCount: 0,
	};
	state.profilePage.posts.push(newPost);
};

export default state;
