import React from 'react';
import './Navbar.css';

function Navbar() {
	return (
		<nav className='app-nav'>
			<ul>
				<li>
					<a href='#'>Profile</a>
				</li>
				<li>
					<a href='#'>Messaages</a>
				</li>
				<li>
					<a href='#'>News</a>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
