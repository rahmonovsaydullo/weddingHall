import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const loggedIn = !!localStorage.getItem('token'); // example check

  const navigate = useNavigate()
  const handleGo = () => {
    navigate('/')
  }
  return (
    <header className="fixed top-0 left-0 w-full z-50 p-4 bg-blue-400 shadow-md flex justify-between items-center">
      <div className='flex items-center gap-2 cursor-pointer' onClick={handleGo}>
        <img className='w-8' src="/weddingHall.png" alt="" />
        <h1>Wedding Hall</h1>
      </div>
      <nav className="flex gap-4">
        {loggedIn ? (
          <>
            <Link to="/bookings">My bookings</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/about">About</Link>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                window.location.reload();
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};


export default Header
