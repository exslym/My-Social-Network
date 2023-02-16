import React from 'react';
import { connect, Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { compose } from 'redux';
import './App.scss';
import Preloader from './components/commons/Preloader/Preloader';
import HeaderContainer from './components/Header/HeaderContainer';
import { LoginPage } from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import { UsersPage } from './components/Users/UsersContainer';
import { withRouter } from './hoc/withRouter';
import { initializeApp } from './redux/app-reducer';
import store, { AppStateType } from './redux/redux-store';

//* ANTD imports:
import 'antd/dist/reset.css';

// const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const News = React.lazy(() => import('./components/News/News'));
const Settings = React.lazy(() => import('./components/Settings/Settings'));

//* TYPES:
type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
	initializeApp: () => void;
};

class App extends React.Component<MapPropsType & DispatchPropsType> {
	catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
		alert('some error');
		// console.log(promiseRejectionEvent);
	};

	componentDidMount() {
		this.props.initializeApp();
		window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
	}

	componentWillUnmount() {
		window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
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

	/* 	render() {
				if (!this.props.initialized) {
			return <Preloader />;
		}
		return (
			<div className='app_wrapper' role={'main'}>
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
	} */

	render() {
		if (!this.props.initialized) {
			return <Preloader />;
		}
		return (
			<div className='wrapper' role={'main'}>
				<HeaderContainer />
				<Navbar />
				<div className='wrapper_content'>
					<React.Suspense fallback={<Preloader />}>
						<Routes>
							<Route path='/' element={<Navigate to='/profile' />} />
							<Route path='/profile' element={<ProfileContainer />} />
							<Route path='/profile/:userId' element={<ProfileContainer />} />
							<Route path='/dialogs/*' element={<DialogsContainer />} />
							<Route path='/users/*' element={<UsersPage pageTitle={'Users'} />} />
							<Route path='/news' element={<News />} />
							<Route path='/settings' element={<Settings />} />
							<Route path='/login' element={<LoginPage />} />
							<Route path='*' element={<div className='notFound'>404 NOT FOUND</div>} />
						</Routes>
					</React.Suspense>
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

const mapStateToProps = (state: AppStateType) => ({
	initialized: state.app.initialized,
});

// export default compose(connect(mapStateToProps, { initializeApp }))(App);

let AppContainer = compose<React.ComponentType>(
	withRouter,
	connect(mapStateToProps, { initializeApp }),
)(App);
// let AppContainer = compose(connect(mapStateToProps, { initializeApp }))(App);

const ExslymApp: React.FC = () => {
	return (
		<HashRouter>
			<Provider store={store}>
				<AppContainer />
			</Provider>
		</HashRouter>
	);
};

export default ExslymApp;
