import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = props => {
	return (
		<BrowserRouter>
			<div className='app_wrapper'>
				<Header />
				<Navbar />
				<div className='app_wrapper_content'>
					<Routes>
						<Route path='/' element={<Profile />} />
						<Route path='/profile' element={<Profile posts={props.posts} />} />
						<Route
							path='/dialogs/*'
							element={<Dialogs dialogs={props.dialogs} messages={props.messages} />}
						/>
						<Route path='/news' element={<News news={props.news} />} />
						<Route path='/settings' element={<Settings />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
};

export default App;
