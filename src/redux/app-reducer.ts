// import { createReducer } from '@reduxjs/toolkit';
import { getAuthUserData } from './auth-reducer';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

//Type
export type InitialStateType = {
	initialized: boolean;
};

let initialState: InitialStateType = {
	initialized: false,
};

const appReducer = (state = initialState, action: any): InitialStateType => {
	switch (action.type) {
		case INITIALIZED_SUCCESS:
			return {
				...state,
				initialized: true,
			};

		default:
			return state;
	}
};

//Type
type initializedSuccessActionType = {
	type: typeof INITIALIZED_SUCCESS;
};

// ACTION_CREATORS:
export const initializedSuccess = (): initializedSuccessActionType => ({
	type: INITIALIZED_SUCCESS,
});

//THUNKS:
export const initializeApp = () => (dispatch: any) => {
	let promise = dispatch(getAuthUserData());
	Promise.all([promise]).then(() => {
		dispatch(initializedSuccess());
	});
};

export default appReducer;
