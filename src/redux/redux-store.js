// import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import sidebarReducer from './sidebar-reducer';
import appReducer from './app-reducer';

let reducers = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	usersPage: usersReducer,
	sideBar: sidebarReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

// let reducer = {
// 	profilePage: profileReducer,
// 	dialogsPage: dialogsReducer,
// 	sideBar: sidebarReducer,
// };
// let store = configureStore({ reducer });

export default store;
