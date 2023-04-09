import React, { Suspense } from 'react';
import { connect, Provider } from 'react-redux';
import { HashRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import { compose } from 'redux';
// import './App.scss';
import Preloader from './components/commons/Preloader/Preloader';
import HeaderContainer from './components/Header/HeaderContainer';
import { LoginPage } from './components/Login/Login';
import { UsersPage } from './components/Users/UsersContainer';
import { withRouter } from './hoc/withRouter';
import { initializeApp } from './redux/app-reducer';
import store, { AppStateGlobalType } from './redux/redux-store';
import styles from './Styles.module.scss';

//* ANTD imports:
import { SettingOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import 'antd/dist/reset.css';

// const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const News = React.lazy(() => import('./components/News/News'));
const Settings = React.lazy(() => import('./components/Settings/Settings'));
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'));

//* TYPES:
type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
	initializeApp: () => void;
};
export type MenuItem = Required<MenuProps>['items'][number];

//* ANTd:
const { Content, Footer, Sider } = Layout;

export function getItem(
	label: React.ReactNode,
	key?: React.Key | null,
	icon?: React.ReactNode,
	children?: MenuItem[],
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
	} as MenuItem;
}

const itemsSideMenu: MenuItem[] = [
	getItem('My Profile', 'My Profile', <UserOutlined />, [
		getItem(<Link to='/profile'>Profile Page</Link>, 'Profile Page'),
		getItem(<Link to='/dialogs'>Messages</Link>, 'Messages'),
	]),

	getItem('Developers', 'Developers', <TeamOutlined />, [
		getItem(<Link to='/users'>Users</Link>, 'Users'),
		getItem(<Link to='/chat'>Chat</Link>, 'Chat'),
	]),

	getItem('Settings', 'Settings', <SettingOutlined />, [
		getItem(<Link to='/settings'>Settings Page</Link>, 'Settings Page'),
		getItem(<Link to='/news'>News</Link>, 'News'),
	]),
];

class App extends React.Component<MapPropsType & DispatchPropsType> {
	catchAllUnhandledErrors = (PromiseRejectionEvent: PromiseRejectionEvent) => {
		console.log('some error');
		console.log(PromiseRejectionEvent);
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
		// return (
		// 	<div className='wrapper' role={'main'}>
		// 		<HeaderContainer />
		// 		<Navbar />
		// 		<div className='wrapper_content'>
		// 			<React.Suspense fallback={<Preloader />}>
		// 				<Routes>
		// 					<Route path='/' element={<Navigate to='/profile' />} />
		// 					<Route path='/profile' element={<ProfileContainer />} />
		// 					<Route path='/profile/:userId' element={<ProfileContainer />} />
		// 					<Route path='/dialogs/*' element={<DialogsContainer />} />
		// 					<Route path='/users/*' element={<UsersPage pageTitle={'Users'} />} />
		// 					<Route path='/news' element={<News />} />
		// 					<Route path='/settings' element={<Settings />} />
		// 					<Route path='/login' element={<LoginPage />} />
		// 					<Route path='*' element={<div className='notFound'>404 NOT FOUND</div>} />
		// 				</Routes>
		// 			</React.Suspense>
		// 		</div>
		// 	</div>
		// );
		return (
			<Layout className={styles.App_wrapper}>
				<HeaderContainer />
				<Content className={styles.App_content}>
					<Layout
						className='site-layout-background'
						style={{ padding: '0', gap: '1em', height: '100%' }}
					>
						<Sider
							className='site-layout-background'
							width={200}
							style={{
								background: 'white',
								borderRadius: '5px',
								border: '1px solid rgba(0, 0, 0, 0.1)',
								height: '100%',
								position: 'relative',
							}}
						>
							<Menu
								mode='inline'
								defaultSelectedKeys={['Profile Page']}
								style={{
									borderRadius: '5px',
								}}
								items={itemsSideMenu}
								className={styles.sideMenuStyles}
							/>

							<Footer className={styles.App_footer}>
								<div className='created-by'>
									<p>
										Social Network <br />
										Created by <br />
										<a
											href={`https://01dev.ru`}
											target='_blank'
											rel='noopener noreferrer'
											className={styles.App_footer_name}
										>
											exslym
										</a>
										<br />
										<a href={`https://github.com/exslym`} target='_blank' rel='noopener noreferrer'>
											github
										</a>
									</p>
								</div>
							</Footer>
						</Sider>
						<Content
							style={{
								padding: '0',
								minHeight: 380,
								border: '1px solid rgba(0, 0, 0, 0.1)',
								borderRadius: '5px',
								overflowY: 'hidden',
							}}
						>
							<Suspense fallback={<Preloader />}>
								<Routes>
									<Route path='/' element={<Navigate to='/profile' />} />
									<Route path='/profile' element={<ProfileContainer />} />
									<Route path='/profile/:userId' element={<ProfileContainer />} />
									<Route path='/dialogs/*' element={<DialogsContainer />} />
									<Route path='/users/*' element={<UsersPage pageTitle={'Users'} />} />
									<Route path='/news' element={<News />} />
									<Route path='/settings' element={<Settings />} />
									<Route path='/login' element={<LoginPage />} />
									<Route path='/chat' element={<ChatPage />} />
									<Route
										path='*'
										element={<div className={styles.App_notFound}>404 NOT FOUND</div>}
									/>
								</Routes>
							</Suspense>
						</Content>
					</Layout>
				</Content>
			</Layout>
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

const mapStateToProps = (state: AppStateGlobalType) => ({
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
