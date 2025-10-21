import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSearch } from '../components/SearchProvider';
import { cardStyle, buttonStyle } from '../styles/CardStyle';

function Sports() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const urlSearchTerm = searchParams.get('q') || '';
  const { searchTerm } = useSearch();
  const currentSearchTerm = searchTerm || urlSearchTerm;

  const shows = [
    { title: 'Cricket League', description: 'Thrilling cricket matches.' },
    { title: 'Football Finals', description: 'High-energy soccer event.' },
    { title: 'Tennis Open', description: 'Elite tennis showdown.' },
  ];

  const filteredShows = shows.filter(
    (show) =>
      show.title.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
      show.description.toLowerCase().includes(currentSearchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', paddingTop: '70px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>Sports</h1>
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        {filteredShows.map((show, index) => (
          <Link
            key={index}
            to={`/book/sports/${show.title.replace(/\s+/g, '')}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={cardStyle}>
              <div style={{ flexGrow: 1, overflow: 'hidden' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>
                  {show.title}
                </h3>
                <p style={{ fontSize: '16px', color: '#666', marginBottom: '15px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {show.description}
                </p>
              </div>
              <button style={buttonStyle}>Book Now</button>
            </div>
          </Link>
        ))}
      </div>
      {filteredShows.length === 0 && currentSearchTerm && (
        <p style={{ textAlign: 'center', color: '#666' }}>No shows found for "{currentSearchTerm}".</p>
      )}
    </div>
  );
}

export default Sports;