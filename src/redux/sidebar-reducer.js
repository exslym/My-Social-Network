// import { createReducer } from '@reduxjs/toolkit';

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
	],
};

// const sidebarReducer = createReducer(initialState, builder => {
// 	builder.addDefaultCase((state, action) => {
// 		return state;
// 	});
// });

const sidebarReducer = (state = initialState, action) => {
	return state;
};

export default sidebarReducer;
