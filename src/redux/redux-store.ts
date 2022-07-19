// import { configureStore } from '@reduxjs/toolkit';
import {
	compose,
	combineReducers,
	applyMiddleware,
	legacy_createStore as createStore,
} from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';
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

//Type
type RootReducerType = typeof rootReducer; // (globalState: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
// @ts-ignore
window.__store__ = store;

/* let reducer = {
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	sideBar: sidebarReducer,
};
let store = configureStore({ reducer }); */

export default store;
