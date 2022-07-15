import React from 'react';
import ReactDOM from 'react-dom/client';
// import { HashRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from './redux/redux-store';
// import App from './App';
import './index.css';
import ExslymApp from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';

const root = ReactDOM.createRoot(document.getElementById('root'));

/* root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
); */

root.render(<ExslymApp />);

/* root.render(
	<HashRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</HashRouter>,
); */

// let rerenderEntireTree = () => {
// 	root.render(
// 		<React.StrictMode>
// 			<Provider store={store}>
// 				<App />
// 			</Provider>
// 		</React.StrictMode>,
// 	);
// };

// rerenderEntireTree();

// store.subscribe(() => {
// 	rerenderEntireTree();
// });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.unregister();
reportWebVitals();
