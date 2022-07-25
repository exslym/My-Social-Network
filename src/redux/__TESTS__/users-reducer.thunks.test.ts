import { actions, follow, unfollow } from '../users-reducer';
import { APIResponseType, ResultCodesEnum } from '../../api/api';
import { usersAPI } from '../../api/users-api';

//* usersAPI Mock:
jest.mock('../../api/users-api');
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();
beforeEach(() => {
	dispatchMock.mockClear();
	getStateMock.mockClear();
	usersAPIMock.follow.mockClear();
	usersAPIMock.unfollow.mockClear();
});

const result: APIResponseType = {
	resultCode: ResultCodesEnum.Success,
	messages: [],
	data: {},
};
usersAPIMock.follow.mockReturnValue(Promise.resolve(result));
usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result));

test('follow thunk test', async () => {
	//* 1. test data:
	const thunk = follow(1);

	//* 2. action
	await thunk(dispatchMock, getStateMock, {});

	//* 3. expectation
	expect(dispatchMock).toBeCalledTimes(3);
	expect(dispatchMock).toHaveBeenCalledWith(actions.toggleFollowingProgress(true, 1));
	expect(dispatchMock).toHaveBeenCalledWith(actions.followSuccess(1));
	expect(dispatchMock).toHaveBeenCalledWith(actions.toggleFollowingProgress(false, 1));
});

test('unfollow thunk test', async () => {
	//* 1. test data:
	const thunk = unfollow(1);

	//* 2. action
	await thunk(dispatchMock, getStateMock, {});

	//* 3. expectation
	expect(dispatchMock).toBeCalledTimes(3);
	expect(dispatchMock).toHaveBeenCalledWith(actions.toggleFollowingProgress(true, 1));
	expect(dispatchMock).toHaveBeenCalledWith(actions.unfollowSuccess(1));
	expect(dispatchMock).toHaveBeenCalledWith(actions.toggleFollowingProgress(false, 1));
});
