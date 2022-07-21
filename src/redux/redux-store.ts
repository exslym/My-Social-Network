import {
	Action,
	compose,
	combineReducers,
	applyMiddleware,
	legacy_createStore as createStore,
} from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import sidebarReducer from './sidebar-reducer';
import appReducer from './app-reducer';

let rootReducer = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	usersPage: usersReducer,
	sideBar: sidebarReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer,
});

//* TYPES:
type RootReducerType = typeof rootReducer; //* (globalState: AppStateType) => AppStateType
type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;

export type AppStateType = ReturnType<RootReducerType>;
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<
	R,
	AppStateType,
	unknown,
	A
>;
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<
	PropertiesType<T>
>;

// @ts-ignore //! @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
// @ts-ignore //! @ts-ignore
window.__store__ = store;

export default store;
