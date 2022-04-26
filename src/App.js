import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import Profile from './components/Profile/Profile';

const App = () => {
	return (
		<div className='app_wrapper'>
			<Header />
			<Navbar />
			<Main />
			<Profile />
		</div>
	);
};

export default App;
