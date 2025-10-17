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
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', width: '300px' }}>
        <h2>{isRegister ? 'Register' : 'Login'}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <button
          onClick={handleAuth}
          style={{ padding: '10px 20px', backgroundColor: '#ff0000', color: 'white', border: 'none', borderRadius: '5px', marginRight: '10px' }}
        >
          {isRegister ? 'Register' : 'Login'}
        </button>
        <button
          onClick={() => setIsRegister(!isRegister)}
          style={{ padding: '10px 20px', backgroundColor: '#666', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          {isRegister ? 'Switch to Login' : 'Switch to Register'}
        </button>
        <button
          onClick={onClose}
          style={{ padding: '10px 20px', backgroundColor: '#ccc', color: 'black', border: 'none', borderRadius: '5px', marginLeft: '10px' }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AuthModal;