import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import Friends from './components/Friends/Friends';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import store from './redux/store';
// import store from './redux/redux-store';

const App = props => {
	return (
		<BrowserRouter>
			<div className='app_wrapper'>
				<Header />
				<Navbar sideBar={props.state.sideBar} />
				<div className='app_wrapper_content'>
					<Routes>
						<Route path='/' element={<Profile store={props.store} />} />
						<Route path='/profile' element={<Profile store={props.store} />} />
						<Route path='/dialogs/*' element={<DialogsContainer store={props.store} />} />
						<Route path='/news' element={<News store={props.store} />} />
						<Route path='/settings' element={<Settings store={props.store} />} />
						<Route path='/friends/*' element={<Friends friends={props.state.sideBar.friends} />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
};

export default App;
