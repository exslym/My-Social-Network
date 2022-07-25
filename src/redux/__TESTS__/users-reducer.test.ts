import usersReducer, { actions } from '../users-reducer';
import type { initialStateType } from '../users-reducer';

//* 1. test data:
let state: initialStateType;

beforeEach(() => {
	state = {
		users: [
			{
				id: 0,
				name: 'testUser0',
				followed: false,
				photos: { small: null, large: null },
				status: 'testStatus0',
			},
			{
				id: 1,
				name: 'testUser1',
				followed: false,
				photos: { small: null, large: null },
				status: 'testStatus1',
			},
			{
				id: 2,
				name: 'testUser2',
				followed: true,
				photos: { small: null, large: null },
				status: 'testStatus2',
			},
			{
				id: 3,
				name: 'testUser3',
				followed: true,
				photos: { small: null, large: null },
				status: 'testStatus3',
			},
		],
		pageSize: 10,
		usersTotalCount: 0,
		currentPage: 1,
		isFetching: false,
		followingInProgress: [],
	};
});

test('follow success test', () => {
	//* 2. action
	const newState = usersReducer(state, actions.followSuccess(1));

	//* 3. expectation
	expect(newState.users[0].followed).toBeFalsy();
	expect(newState.users[1].followed).toBeTruthy();
});

test('unfollow success test', () => {
	//* 2. action
	const newState = usersReducer(state, actions.unfollowSuccess(3));

	//* 3. expectation
	expect(newState.users[2].followed).toBeTruthy();
	expect(newState.users[3].followed).toBeFalsy();
});
