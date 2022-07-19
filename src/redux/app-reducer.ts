// import { createReducer } from '@reduxjs/toolkit';
// import { Dispatch } from 'redux';
import { getAuthUserData } from './auth-reducer';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

//Type
export type InitialStateType = {
	initialized: boolean;
};

let initialState: InitialStateType = {
	initialized: false,
};

const appReducer = (
	state = initialState,
	action: InitializedSuccessActionType,
): InitialStateType => {
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
type InitializedSuccessActionType = {
	type: typeof INITIALIZED_SUCCESS;
};

// ACTION_CREATORS:
export const initializedSuccess = (): InitializedSuccessActionType => ({
	type: INITIALIZED_SUCCESS,
});

//Type
// type DispatchType = Dispatch<InitializedSuccessActionType>;
//THUNKS:
export const initializeApp = () => (dispatch: any) => {
	let promise = dispatch(getAuthUserData());
	Promise.all([promise]).then(() => {
		dispatch(initializedSuccess());
	});
};

export default appReducer;
