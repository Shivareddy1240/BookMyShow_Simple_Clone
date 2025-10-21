import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Plays from './pages/Plays';
import Sports from './pages/Sports';
import Activities from './pages/Activities';
import Booking from './components/Booking';
import Confirmation from './components/Confirmation';
import Profile from './components/Profile';
import Payment from './components/Payment';

function App() {
  return (
    <div>
      <Header />
      <div className="container" style={{ paddingTop: '70px', padding: '20px' }}> {/* Added paddingTop to offset header height */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/plays" element={<Plays />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/book/:category/:show" element={<Booking />} />
          <Route path="/confirm/:category/:show" element={<Confirmation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/pay/:category/:show" element={<Payment />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;