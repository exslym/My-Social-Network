import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import Friends from './components/Friends/Friends';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = props => {
	return (
		<BrowserRouter>
			<div className='app_wrapper'>
				<Header />
				<Navbar sideBar={props.state.sideBar} />
				<div className='app_wrapper_content'>
					<Routes>
						<Route
							path='/'
							element={
								<Profile
									profilePage={props.state.profilePage}
									addPost={props.addPost}
									updateNewPostText={props.updateNewPostText}
								/>
							}
						/>
						<Route
							path='/profile'
							element={
								<Profile
									profilePage={props.state.profilePage}
									addPost={props.addPost}
									updateNewPostText={props.updateNewPostText}
								/>
							}
						/>
						<Route path='/dialogs/*' element={<Dialogs dialogsPage={props.state.dialogsPage} />} />
						<Route path='/news' element={<News />} />
						<Route path='/settings' element={<Settings />} />
						<Route path='/friends' element={<Friends friends={props.state.sideBar.friends} />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
};

export default App;
