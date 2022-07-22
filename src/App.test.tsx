import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import ExslymApp from './App';
import store from './redux/redux-store';

test('renders app without crashing 1', () => {
	render(
		<BrowserRouter>
			<Provider store={store}>
				<ExslymApp />
			</Provider>
		</BrowserRouter>,
	);
	const div = screen.getByRole(/main/i);
	expect(div).toBeInTheDocument();
});

// test('renders app without crashing 2', () => {
// 	const { getByRole } = render(
// 		<BrowserRouter>
// 			<Provider store={store}>
// 				<App />
// 			</Provider>
// 		</BrowserRouter>,
// 	);
// 	const div = screen.getByRole(/main/i);
// 	expect(div).toBeInTheDocument();
// });

test('renders app without crashing 3', () => {
	const div = document.createElement('div');
	ReactDOM.render(<ExslymApp />, div);
	ReactDOM.unmountComponentAtNode(div);
});
