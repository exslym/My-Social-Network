import {
	Action,
	applyMiddleware,
	combineReducers,
	compose,
	legacy_createStore as createStore,
} from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import appReducer from './app-reducer';
import authReducer from './auth-reducer';
import chatReducer from './chat-reducer';
import dialogsReducer from './dialogs-reducer';
import profileReducer from './profile-reducer';
import sidebarReducer from './sidebar-reducer';
import usersReducer from './users-reducer';

let rootReducers = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	usersPage: usersReducer,
	sideBar: sidebarReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer,
	chat: chatReducer,
});

//* TYPES:
type RootReducersType = typeof rootReducers;
export type AppStateGlobalType = ReturnType<RootReducersType>;

/* type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<
	PropertiesType<T>
>; */
//* refactored:
export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U }
	? U
	: never;

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<
	R,
	AppStateGlobalType,
	unknown,
	A
>;

// @ts-ignore //! @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
// @ts-ignore //! @ts-ignore
window.__store__ = store;

export default store;
