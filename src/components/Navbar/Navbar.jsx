import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const [hide, setHide] = useState('hideCl');
    const [show, setShow] = useState('showCl');
    const username = useSelector(state => state.auth.username);

    return (
        <header className='nav-container'>
            <h1 className='logo'>MoviesInfo</h1>
            <nav className='navbar'>
                <ul className={`navbar-list ${hide}`} onClick={() => { setShow('hideCl'); setHide('showCl') }}>
                    <li> <a className='navbar-link'>{username}</a> </li>

                    <li>{isLoggedIn && <Link to='/home' className='navbar-link'>Home</Link>} </li>
                    {/* <Link to='/home' className='navbar-link'>Home</Link> */}

                    <Link to='/watchlist' className='navbar-link'>Watch List</Link>
                    <Link to='/favorite' className='navbar-link'>Favorite</Link>
                    <Link to='/' className='navbar-link'>Logout</Link>
                </ul>
            </nav>
            <div className='mobile-navbar-btn'>
                <i className={`bi bi-list mobile-nav-icon menuIcon ${show}`}
                    onClick={() => { setShow('hideCl'); setHide('showCl') }}></i>

                <i className={`bi bi-x-lg mobile-nav-icon closeIcon ${hide}`}
                    onClick={() => { setShow('showCl'); setHide('hideCl') }}></i>
            </div>
        </header>
    );
};

export default Navbar;
