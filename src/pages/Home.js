import React from 'react';
import { Link } from 'react-router-dom';
import { FaFilm, FaTheaterMasks, FaRunning, FaHiking } from 'react-icons/fa';

function Home() {
  const categories = [
    { path: '/movies', icon: FaFilm, name: 'Movies', description: 'Enjoy the latest blockbusters!' },
    { path: '/plays', icon: FaTheaterMasks, name: 'Plays', description: 'Experience live theater.' },
    { path: '/sports', icon: FaRunning, name: 'Sports', description: 'Catch thrilling matches.' },
    { path: '/activities', icon: FaHiking, name: 'Activities', description: 'Fun outdoor adventures.' },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: '40px' }}>
        Welcome to BookMyShow
      </h1>
      <p style={{ fontSize: '18px', color: '#666', textAlign: 'center', marginBottom: '40px' }}>
        Explore movies, plays, sports, and activities!
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <Link
              key={index}
              to={category.path}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div
                style={{
                  width: '250px',
                  padding: '20px',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Icon style={{ fontSize: '40px', color: '#ff0000', marginBottom: '15px' }} />
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                  {category.name}
                </h2>
                <p style={{ fontSize: '16px', color: '#666', marginBottom: '15px' }}>
                  {category.description}
                </p>
                <button
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#ff0000',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: '500',
                  }}
                >
                  Explore Now
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Home;