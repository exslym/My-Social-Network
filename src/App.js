import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/commons/Preloader/Preloader';
import LoginPage from './components/Login/Login';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import './App.css';

// import { getAuthUserData } from './redux/auth-reducer';
// import { withRouter } from './hoc/withRouter';
// import store from './redux/store';
// import store from './redux/redux-store';
class App extends React.Component {
	componentDidMount() {
		this.props.initializeApp();
	}

	/* 	render() {
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
						</Routes>
					</div>
				</div>
			</BrowserRouter>
		);
	} */

	render() {
		if (!this.props.initialized) {
			return <Preloader />;
		}
		return (
			<div className='app_wrapper'>
				<HeaderContainer />
				<Navbar />
				<div className='app_wrapper_content'>
					<Routes>
						<Route path='/login' element={<LoginPage />} />
						<Route path='/' element={<ProfileContainer />} />
						<Route path='/profile/' element={<ProfileContainer />} />
						<Route path='/profile/:userId' element={<ProfileContainer />} />
						<Route path='/dialogs/*' element={<DialogsContainer />} />
						<Route path='/users/*' element={<UsersContainer />} />
						<Route path='/news' element={<News />} />
						<Route path='/settings' element={<Settings />} />
					</Routes>
				</div>
			</div>
		);
	}
}

/* const App = () => {
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
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
}; */

const mapStateToProps = state => ({
	initialized: state.app.initialized,
});
export default compose(connect(mapStateToProps, { initializeApp }))(App);
