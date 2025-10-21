import React, { useState } from 'react';

function AuthModal({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleAuth = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (isRegister) {
      users.push({ email, password });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registration successful! Please log in.');
      setIsRegister(false);
    } else {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify({ email }));
        onLogin();
        onClose();
      } else {
        alert('Invalid email or password.');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark overlay
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white', // White body
        borderRadius: '15px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
        width: '350px',
        overflow: 'hidden', // Ensure rounded corners apply to content
      }}>
        <div style={{
          backgroundColor: '#ff0000', // Red top like header
          padding: '20px',
          textAlign: 'center',
          borderTopLeftRadius: '15px',
          borderTopRightRadius: '15px',
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: 'white', margin: 0, textTransform: 'uppercase' }}>
            {isRegister ? 'Register' : 'Login'}
          </h2>
        </div>
        <div style={{ padding: '30px', textAlign: 'center' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              margin: '10px 0',
              border: '2px solid #ddd',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.3s',
              color: '#333',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#ff0000')}
            onBlur={(e) => (e.target.style.borderColor = '#ddd')}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              margin: '10px 0',
              border: '2px solid #ddd',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.3s',
              color: '#333',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#ff0000')}
            onBlur={(e) => (e.target.style.borderColor = '#ddd')}
          />
          <button
            onClick={handleAuth}
            style={{
              padding: '12px 25px',
              backgroundColor: '#ff0000', // Red button
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              margin: '10px 5px',
              cursor: 'pointer',
              transition: 'transform 0.2s, background-color 0.3s',
            }}
            onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
          >
            {isRegister ? 'Register' : 'Login'}
          </button>
          <button
            onClick={() => setIsRegister(!isRegister)}
            style={{
              padding: '12px 25px',
              backgroundColor: '#e74c3c', // Lighter red for switch
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              margin: '10px 5px',
              cursor: 'pointer',
              transition: 'transform 0.2s, background-color 0.3s',
            }}
            onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
          >
            {isRegister ? 'Switch to Login' : 'Switch to Register'}
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '12px 25px',
              backgroundColor: '#ccc',
              color: '#333',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              margin: '10px 5px',
              cursor: 'pointer',
              transition: 'transform 0.2s, background-color 0.3s',
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.backgroundColor = '#bbb';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.backgroundColor = '#ccc';
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;