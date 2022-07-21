import profileReducer, { actions } from '../profile-reducer';

let state = {
	posts: [
		{ id: 1, post: 'My first post', likesCount: 25 },
		{ id: 2, post: 'My second post', likesCount: 18 },
		{ id: 3, post: 'My third post', likesCount: 6 },
	],
	profile: null,
	status: '',
	newPostText: '',
};

test('length of posts should be incremented', () => {
	// 1. test data
	let action = actions.addPostActionCreator('newPostText');
	// 2. action
	let newState = profileReducer(state, action);
	// 3. expectation
	expect(newState.posts.length).toBe(4);
});

test('new post should be correct', () => {
	// 1. test data
	let action = actions.addPostActionCreator('newPostText');
	// 2. action
	let newState = profileReducer(state, action);

	// 3. expectation
	expect(newState.posts[3].post).toBe('newPostText');
});

test('after deleting length of posts should be decremented', () => {
	// 1. test data
	let action = actions.deletePost(1);
	// 2. action
	let newState = profileReducer(state, action);

	// 3. expectation
	expect(newState.posts.length).toBe(2);
});

test("after deleting length of posts shouldn't be decremented if id is correct", () => {
	// 1. test data
	let action = actions.deletePost(1000);
	// 2. action
	let newState = profileReducer(state, action);

	// 3. expectation
	expect(newState.posts.length).toBe(3);
});
