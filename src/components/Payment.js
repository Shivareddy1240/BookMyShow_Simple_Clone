import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Payment() {
  const { category, show } = useParams();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [upiId, setUpiId] = useState('');
  const [walletBalance, setWalletBalance] = useState(500); // Mock wallet balance
  const mockTotal = category === 'activities' ? 750 : 600; // Mock total from booking

  const handlePayment = () => {
    let isValid = false;
    if (selectedMethod === 'card' && cardNumber.length === 16) {
      isValid = true;
    } else if (selectedMethod === 'upi' && upiId.includes('@')) {
      isValid = true;
    } else if (selectedMethod === 'wallet' && walletBalance >= mockTotal) {
      setWalletBalance(walletBalance - mockTotal);
      isValid = true;
    } else {
      alert('Invalid details. For Card: Enter 16 digits; UPI: Include @upi; Wallet: Insufficient balance.');
      return;
    }

    if (isValid) {
      alert(`Payment of ₹${mockTotal} via ${selectedMethod.toUpperCase()} successful for "${show}"!`);
      navigate(`/confirm/${category}/${show}`);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', paddingTop: '70px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Payment</h1>
      <p style={{ fontSize: '16px', color: '#666', marginBottom: '20px' }}>Pay for your {category} tickets for "{show}".</p>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Select Payment Method</h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={() => setSelectedMethod('card')}
            style={{
              padding: '10px 20px',
              backgroundColor: selectedMethod === 'card' ? '#ff0000' : '#f0f0f0',
              color: selectedMethod === 'card' ? 'white' : '#333',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Card
          </button>
          <button
            onClick={() => setSelectedMethod('upi')}
            style={{
              padding: '10px 20px',
              backgroundColor: selectedMethod === 'upi' ? '#ff0000' : '#f0f0f0',
              color: selectedMethod === 'upi' ? 'white' : '#333',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            UPI
          </button>
          <button
            onClick={() => setSelectedMethod('wallet')}
            style={{
              padding: '10px 20px',
              backgroundColor: selectedMethod === 'wallet' ? '#ff0000' : '#f0f0f0',
              color: selectedMethod === 'wallet' ? 'white' : '#333',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Wallet (₹{walletBalance})
          </button>
        </div>
        {selectedMethod === 'card' && (
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Card Number (16 digits):</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
              maxLength="16"
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px' }}
              placeholder="1234 5678 9012 3456"
            />
          </div>
        )}
        {selectedMethod === 'upi' && (
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>UPI ID:</label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px' }}
              placeholder="user@upi"
            />
          </div>
        )}
        {selectedMethod === 'wallet' && (
          <div style={{ marginBottom: '20px' }}>
            <p style={{ color: '#333' }}>Wallet Balance: ₹{walletBalance}</p>
            <p style={{ color: '#666' }}>Sufficient for this payment.</p>
          </div>
        )}
        <p style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>Total: ₹{mockTotal}</p>
        <button
          onClick={handlePayment}
          style={{
            padding: '12px 25px',
            backgroundColor: '#ff0000',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
          onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
        >
          Pay Now
        </button>
        <button
          onClick={() => navigate('/')}
          style={{
            marginLeft: '10px',
            padding: '12px 25px',
            backgroundColor: '#ccc',
            color: '#333',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Payment;