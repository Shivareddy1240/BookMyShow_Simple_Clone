import React from 'react';
import { Link } from 'react-router-dom';
import { FaFilm, FaTheaterMasks, FaRunning, FaHiking } from 'react-icons/fa';
import { cardStyle, buttonStyle } from '../styles/CardStyle';

function Home() {
  const categories = [
    { path: '/movies', icon: FaFilm, name: 'Movies', description: 'Enjoy the latest blockbusters!' },
    { path: '/plays', icon: FaTheaterMasks, name: 'Plays', description: 'Experience live theater.' },
    { path: '/sports', icon: FaRunning, name: 'Sports', description: 'Catch thrilling matches.' },
    { path: '/activities', icon: FaHiking, name: 'Activities', description: 'Fun outdoor adventures.' },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', paddingTop: '70px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: '40px' }}>
        Welcome to BookMyShow
      </h1>
      <p style={{ fontSize: '18px', color: '#666', textAlign: 'center', marginBottom: '40px' }}>
        Explore movies, plays, sports, and activities!
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <Link
              key={index}
              to={category.path}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div style={cardStyle}>
                <div style={{ flexGrow: 1, overflow: 'hidden' }}>
                  <Icon style={{ fontSize: '40px', color: '#ff0000', marginBottom: '15px' }} />
                  <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                    {category.name}
                  </h2>
                  <p style={{ fontSize: '16px', color: '#666', marginBottom: '15px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {category.description}
                  </p>
                </div>
                <button style={buttonStyle}>Explore Now</button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Home;