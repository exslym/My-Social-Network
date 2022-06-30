import profileReducer, { addPostActionCreator } from './profile-reducer';

test('length of posts should be incremented', () => {
	// 1. test data
	let action = addPostActionCreator('newPostText');
	let state = {
		posts: [
			{ id: 1, post: 'My first post', likesCount: 25 },
			{ id: 2, post: 'My second post', likesCount: 18 },
			{ id: 3, post: 'My third post', likesCount: 6 },
		],
	};
	// 2. action
	let newState = profileReducer(state, action);

	// 3. expectation
	expect(newState.posts.length).toBe(4);
});
test('new post should be correct', () => {
	// 1. test data
	let action = addPostActionCreator('newPostText');
	let state = {
		posts: [
			{ id: 1, post: 'My first post', likesCount: 25 },
			{ id: 2, post: 'My second post', likesCount: 18 },
			{ id: 3, post: 'My third post', likesCount: 6 },
		],
	};
	// 2. action
	let newState = profileReducer(state, action);

	// 3. expectation
	expect(newState.posts[3].post).toBe('newPostText');
});
