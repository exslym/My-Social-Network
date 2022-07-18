// import { createReducer } from '@reduxjs/toolkit';

//Type
type FriendType = {
	id: number;
	name: string;
	avatar: string;
};

let initialState = {
	friends: [
		{
			id: 1,
			name: 'Andrey',
			avatar: 'avatar1.png',
		},
		{
			id: 2,
			name: 'Michael',
			avatar: 'avatar2.png',
		},
		{
			id: 3,
			name: 'John',
			avatar: 'avatar3.png',
		},
		{
			id: 4,
			name: 'Vika',
			avatar: 'avatar4.png',
		},
		{
			id: 5,
			name: 'Viktor',
			avatar: 'avatar5.png',
		},
	] as Array<FriendType>,
};

//type
type initialStateType = typeof initialState;

// const sidebarReducer = createReducer(initialState, builder => {
// 	builder.addDefaultCase((state, action) => {
// 		return state;
// 	});
// });

const sidebarReducer = (state = initialState, action: any): initialStateType => {
	return state;
};

export default sidebarReducer;
