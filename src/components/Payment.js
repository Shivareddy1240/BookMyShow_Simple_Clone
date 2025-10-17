import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Payment() {
  const { category, show } = useParams();
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const mockPrice = category === 'activities' ? 750 : 600;

  const handlePayment = () => {
    if (cardNumber.length === 16) {
      alert(`Payment of ₹${mockPrice} for "${show}" successful!`);
      navigate(`/confirm/${category}/${show}`);
    } else {
      alert('Invalid card number. Please enter a 16-digit number.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Payment</h1>
      <p>Pay for your {category} tickets for "{show}".</p>
      <div style={{ margin: '20px 0' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Card Number:</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
          maxLength="16"
          style={{ padding: '8px', width: '200px', border: '1px solid #ddd', borderRadius: '4px' }}
          placeholder="Enter 16-digit card number"
        />
      </div>
      <p>Total: ₹{mockPrice}</p>
      <button
        onClick={handlePayment}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Pay Now
      </button>
      <button
        onClick={() => navigate('/')}
        style={{
          marginLeft: '10px',
          padding: '10px 20px',
          backgroundColor: '#ff0000',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Cancel
      </button>
    </div>
  );
}

export default Payment;