import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSearch } from '../components/SearchProvider';

function Movies() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const urlSearchTerm = searchParams.get('q') || '';
  const { searchTerm } = useSearch();
  const currentSearchTerm = searchTerm || urlSearchTerm;

  const shows = [
    { title: 'Action Thriller', description: 'Exciting adventure in the city.' },
    { title: 'Comedy Special', description: 'Laugh out loud with friends.' },
    { title: 'Sci-Fi Epic', description: 'Space journey with stunning visuals.' },
    { title: 'Romantic Drama', description: 'Heartwarming love story.' },
  ];

  const filteredShows = shows.filter(
    (show) =>
      show.title.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
      show.description.toLowerCase().includes(currentSearchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Movies</h1>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {filteredShows.map((show, index) => (
          <div key={index} style={{ border: '1px solid #ddd', padding: '10px', width: '200px' }}>
            <h3>{show.title}</h3>
            <p>{show.description}</p>
            <Link to={`/book/movies/${show.title.replace(/\s+/g, '')}`}>
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

export default Movies;