import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFilm, FaTheaterMasks, FaRunning, FaHiking } from 'react-icons/fa';
import { useSearch } from './SearchProvider';
import AuthModal from './AuthModal';

function Header() {
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm } = useSearch();
  const [showModal, setShowModal] = useState(false);
  const isLoggedIn = !!localStorage.getItem('currentUser');

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const currentPath = window.location.pathname;
      navigate(`${currentPath}?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <header style={{
      backgroundColor: '#ff0000',
      color: 'white',
      padding: '10px',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000, // Ensures header stays above content
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Optional: subtle shadow
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
          <h2>BookMyShow</h2>
        </Link>
        <input
          type="text"
          placeholder="Search for Movies, Events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
          style={{ padding: '8px', width: '300px', borderRadius: '4px', border: 'none' }}
        />
        <nav style={{ display: 'flex', gap: '20px' }}>
          <Link to="/movies" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' }}>
            <FaFilm style={{ marginRight: '5px' }} /> Movies
          </Link>
          <Link to="/plays" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' }}>
            <FaTheaterMasks style={{ marginRight: '5px' }} /> Plays
          </Link>
          <Link to="/sports" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' }}>
            <FaRunning style={{ marginRight: '5px' }} /> Sports
          </Link>
          <Link to="/activities" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' }}>
            <FaHiking style={{ marginRight: '5px' }} /> Activities
          </Link>
          <Link to="/profile" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' }}>
            Profile
          </Link>
          {isLoggedIn ? (
            <button onClick={handleLogout} style={{ backgroundColor: 'white', color: 'black', padding: '5px 10px', borderRadius: '5px' }}>
              Logout
            </button>
          ) : (
            <button onClick={() => setShowModal(true)} style={{ backgroundColor: 'white', color: 'black', padding: '5px 10px', borderRadius: '5px' }}>
              Login
            </button>
          )}
        </nav>
      </div>
      <AuthModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onLogin={() => {
          setShowModal(false);
          navigate('/profile');
        }}
      />
    </header>
  );
}

export default Header;