// import { configureStore } from '@reduxjs/toolkit';
import { legacy_createStore as createStore } from 'redux';
import { combineReducers } from 'redux';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import sidebarReducer from './sidebar-reducer';

let reducers = combineReducers({
	profilePage: profileReducer,
	dialogsPage: dialogsReducer,
	usersPage: usersReducer,
	auth: authReducer,
	sideBar: sidebarReducer,
});

let store = createStore(reducers);

window.store = store;

// let reducer = {
// 	profilePage: profileReducer,
// 	dialogsPage: dialogsReducer,
// 	sideBar: sidebarReducer,
// };
// let store = configureStore({ reducer });

export default store;
