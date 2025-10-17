import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      alert('Please log in to view your profile.');
      navigate('/');
      return;
    }
    const savedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(savedBookings);
  }, [navigate]);

  const addMockBooking = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    const newBooking = { id: Date.now(), category: 'movies', show: 'ActionThriller', seats: [1, 2], price: 400, date: new Date().toLocaleString() };
    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>My Profile</h1>
      <p>Email: {JSON.parse(localStorage.getItem('currentUser') || '{}').email || 'Not logged in'}</p>
      <button
        onClick={addMockBooking}
        style={{
          padding: '10px 20px',
          backgroundColor: '#ff0000',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        Add Mock Booking
      </button>
      <h2>Booking History</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: '0' }}>
          {bookings.map((booking) => (
            <li key={booking.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
              <p><strong>Category:</strong> {booking.category}</p>
              <p><strong>Show:</strong> {booking.show}</p>
              <p><strong>Seats:</strong> {booking.seats.join(', ')}</p>
              <p><strong>Price:</strong> ₹{booking.price}</p>
              <p><strong>Date:</strong> {booking.date}</p>
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={() => navigate('/')}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#ff0000',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Back to Home
      </button>
    </div>
  );
}

export default Profile;