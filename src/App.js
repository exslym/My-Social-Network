import React from 'react';
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Article1 from './components/Article1';
import Article2 from './components/Article2';
import Footer from './components/Footer';

function App() {
	return (
		<div className='app-wrapper'>
			<Header />
			<Navbar />
			<Main />
			<Article1 />
			<Article2 />
			<Footer />
		</div>
	);
}

export default App;
