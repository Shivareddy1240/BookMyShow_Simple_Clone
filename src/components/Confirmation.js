import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Confirmation() {
  const { category, show } = useParams();
  const navigate = useNavigate();
  const [canCancel, setCanCancel] = useState(true);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const mockPrice = category === 'activities' ? 750 : 600; // Mock price

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setCanCancel(false);
    }
  }, [timeLeft]);

  const handleCancel = () => {
    alert(`Booking for "${show}" cancelled. Refund of ₹${mockPrice} processed!`);
    navigate('/');
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1 style={{ color: '#4CAF50', fontSize: '32px' }}>Booking Confirmed! 🎉</h1>
      <p style={{ fontSize: '18px', margin: '20px 0' }}>Your {category} tickets for "{show}" are booked.</p>
      <ul style={{ textAlign: 'left', display: 'inline-block' }}>
        <li>Seats: 1, 5, 12 (or your selected)</li>
        <li>Total: ₹{mockPrice}</li>
        <li>Email sent to your account</li>
      </ul>
      {canCancel && (
        <div style={{ marginTop: '20px' }}>
          <p>Cancel within {formatTime(timeLeft)} to get a full refund.</p>
          <button
            onClick={handleCancel}
            style={{
              padding: '10px 20px',
              backgroundColor: '#ff4444',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            Cancel Booking
          </button>
        </div>
      )}
      {!canCancel && <p style={{ color: '#666' }}>Cancellation period has ended.</p>}
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

export default Confirmation;