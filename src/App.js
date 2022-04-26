import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import Article1 from './components/Articles/Article1';
import Article2 from './components/Articles/Article2';
import Footer from './components/Footer/Footer';

function App() {
	return (
		<div className='app_wrapper'>
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
