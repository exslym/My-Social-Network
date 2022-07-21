import type { InferActionsTypes } from './redux-store';
import { getAuthUserData } from './auth-reducer';

//* TYPES:
export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;

let initialState = {
	initialized: false,
};

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case 'SN/APP/INITIALIZED_SUCCESS':
			return {
				...state,
				initialized: true,
			};
		default:
			return state;
	}
};

//* ACTION_CREATORS:
export const actions = {
	initializedSuccess: () => ({ type: 'SN/APP/INITIALIZED_SUCCESS' } as const),
};

//* THUNKS:
export const initializeApp = () => (dispatch: any) => {
	let promise = dispatch(getAuthUserData());
	Promise.all([promise]).then(() => {
		dispatch(actions.initializedSuccess());
	});
};

export default appReducer;
