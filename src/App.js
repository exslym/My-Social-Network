import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
// import Users from './components/Users/Users';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import store from './redux/store';
// import store from './redux/redux-store';

const App = () => {
	return (
		<BrowserRouter>
			<div className='app_wrapper'>
				<Header />
				<Navbar />
				<div className='app_wrapper_content'>
					<Routes>
						<Route path='/' element={<Profile />} />
						<Route path='/profile' element={<Profile />} />
						<Route path='/dialogs/*' element={<DialogsContainer />} />
						<Route path='/news' element={<News />} />
						<Route path='/settings' element={<Settings />} />
						<Route path='/users/*' element={<UsersContainer />} />
						{/* <Route path='/users/*' element={<Users store={props.store} />} /> */}
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
};

// const App = props => {
// 	return (
// 		<BrowserRouter>
// 			<div className='app_wrapper'>
// 				<Header />
// 				<Navbar store={props.store} />
// 				{/* <Navbar sideBar={props.state.sideBar} /> */}
// 				<div className='app_wrapper_content'>
// 					<Routes>
// 						<Route path='/' element={<Profile store={props.store} />} />
// 						<Route path='/profile' element={<Profile store={props.store} />} />
// 						<Route path='/dialogs/*' element={<DialogsContainer store={props.store} />} />
// 						<Route path='/news' element={<News store={props.store} />} />
// 						<Route path='/settings' element={<Settings store={props.store} />} />
// 						<Route path='/friends/*' element={<Friends store={props.store} />} />
// 						{/* <Route path='/friends/*' element={<Friends friends={props.state.sideBar.friends} />} /> */}
// 					</Routes>
// 				</div>
// 			</div>
// 		</BrowserRouter>
// 	);
// };

export default App;
