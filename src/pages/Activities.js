import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSearch } from '../components/SearchProvider';

function Activities() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const urlSearchTerm = searchParams.get('q') || '';
  const { searchTerm } = useSearch();
  const currentSearchTerm = searchTerm || urlSearchTerm;

  const shows = [
    { title: 'Adventure Park', description: 'Rides and fun for all.' },
    { title: 'Nature Trek', description: 'Scenic outdoor adventure.' },
    { title: 'Water Sports', description: 'Thrilling water activities.' },
  ];

  const filteredShows = shows.filter(
    (show) =>
      show.title.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
      show.description.toLowerCase().includes(currentSearchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Activities</h1>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {filteredShows.map((show, index) => (
          <div key={index} style={{ border: '1px solid #ddd', padding: '10px', width: '200px' }}>
            <h3>{show.title}</h3>
            <p>{show.description}</p>
            <Link to={`/book/activities/${show.title.replace(/\s+/g, '')}`}>
              <button
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#ff0000',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Book Now
              </button>
            </Link>
          </div>
        ))}
      </div>
      {filteredShows.length === 0 && currentSearchTerm && (
        <p style={{ textAlign: 'center', color: '#666' }}>No shows found for "{currentSearchTerm}".</p>
      )}
    </div>
  );
}

export default Activities;