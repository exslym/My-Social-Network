import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
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
				<div className='app_wrapper_content'>
					<Routes>
						<Route exact path='/' element={<Profile />} />
						<Route path='/profile' element={<Profile />} />
						<Route path='/dialogs' element={<Dialogs />} />
						<Route path='/dialogs/:dialogsId' element={<Dialogs />} />
						<Route path='/news' element={<News />} />
						<Route path='/settings' element={<Settings />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
};

export default App;
