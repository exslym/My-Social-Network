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
	const div1 = document.createElement('div');
	expect(div1).toBeInTheDocument();
});

test('renders app without crashing 2', () => {
	render(
		<BrowserRouter>
			<Provider store={store}>
				<ExslymApp />
			</Provider>
		</BrowserRouter>,
	);
	const div2 = screen.getByRole(/main/i);
	expect(div2).toBeInTheDocument();
});

test('renders app without crashing 3', () => {
	const div3 = document.createElement('div');
	ReactDOM.render(
		<BrowserRouter>
			<Provider store={store}>
				<ExslymApp />
			</Provider>
		</BrowserRouter>,
		div3,
	);
	ReactDOM.unmountComponentAtNode(div3);
});
