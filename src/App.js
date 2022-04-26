import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
	return (
		<BrowserRouter>
			<div className='app_wrapper'>
				<Header />
				<Navbar />
				<Main />
				<div className='app_wrapper_content'>
					<Routes>
						<Route path='/dialogs' element={<Dialogs />} />
						<Route path='/profile' element={<Profile />} />
						<Route path='/news' element={<News />} />
						<Route path='/settings' element={<Settings />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
};

export default App;
