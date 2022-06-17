import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import { getAuthUserData } from './redux/auth-reducer';
import { initializeApp } from './redux/app-reducer';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import LoginPage from './components/Login/Login';
import Preloader from './components/commons/Preloader/Preloader';
import './App.css';

// import { withRouter } from './hoc/withRouter';
// import store from './redux/store';
// import store from './redux/redux-store';
class App extends React.Component {
	componentDidMount() {
		this.props.initializeApp();
	}

	render() {
		if (!this.props.initialized) {
			return <Preloader />;
		}
		return (
			<BrowserRouter>
				<div className='app_wrapper'>
					<HeaderContainer />
					<Navbar />
					<div className='app_wrapper_content'>
						<Routes>
							<Route path='/' element={<ProfileContainer />} />
							<Route path='/profile/' element={<ProfileContainer />} />
							<Route path='/profile/:userId' element={<ProfileContainer />} />
							<Route path='/dialogs/*' element={<DialogsContainer />} />
							<Route path='/users/*' element={<UsersContainer />} />
							<Route path='/news' element={<News />} />
							<Route path='/settings' element={<Settings />} />
							<Route path='/login' element={<LoginPage />} />
							{/* <Route path='/users/*' element={<Users store={props.store} />} /> */}
						</Routes>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

// const App = () => {
// 	return (
// 		<BrowserRouter>
// 			<div className='app_wrapper'>
// 				<HeaderContainer />
// 				<Navbar />
// 				<div className='app_wrapper_content'>
// 					<Routes>
// 						<Route path='/' element={<ProfileContainer />} />
// 						<Route path='/profile/' element={<ProfileContainer />} />
// 						<Route path='/profile/:userId' element={<ProfileContainer />} />
// 						<Route path='/dialogs/*' element={<DialogsContainer />} />
// 						<Route path='/users/*' element={<UsersContainer />} />
// 						<Route path='/news' element={<News />} />
// 						<Route path='/settings' element={<Settings />} />
// 						<Route path='/login' element={<LoginPage />} />
// 						{/* <Route path='/users/*' element={<Users store={props.store} />} /> */}
// 					</Routes>
// 				</div>
// 			</div>
// 		</BrowserRouter>
// 	);
// };

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

const mapStateToProps = state => ({
	initialized: state.app.initialized,
});
export default compose(connect(mapStateToProps, { initializeApp }))(App);
