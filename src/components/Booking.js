import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Booking() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { category, show } = useParams();
  const navigate = useNavigate();

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const [childTickets, setChildTickets] = useState(0);
  const [adultTickets, setAdultTickets] = useState(1);

  // Pricing logic (base prices per category)
  const getBasePrice = () => {
    switch (category) {
      case 'movies':
      case 'plays':
        return { perSeat: 200, label: 'per seat' }; // ₹200 per seat
      case 'sports':
        return { perSeat: 500, label: 'per seat' }; // ₹500 per seat
      case 'activities':
        return { adult: 300, child: 150, label: 'per ticket' }; // ₹300/Adult, ₹150/Child
      default:
        return { perSeat: 100, label: 'per seat' }; // Default
    }
  };

  const calculateTotalPrice = () => {
    if (category === 'activities') {
      const basePrice = getBasePrice();
      return (adultTickets * basePrice.adult) + (childTickets * basePrice.child);
    } else {
      const basePrice = getBasePrice();
      return selectedSeats.length * basePrice.perSeat;
    }
  };

  const getIndicatorAndLayout = () => {
    if (category === 'movies' || category === 'plays') {
      return {
        text: 'Screen',
        label: 'Screen is this side ↑',
        layout: 'seats',
      };
    } else if (category === 'sports') {
      return {
        text: 'Stadium',
        label: 'Stadium is in the center',
        layout: 'stadium',
      };
    } else if (category === 'activities') {
      return {
        text: '',
        label: '',
        layout: 'tickets',
      };
    }
    return { text: 'Area', label: 'Event area is this side ↑', layout: 'seats' };
  };

  const { text, label, layout } = getIndicatorAndLayout();
  const basePrice = getBasePrice();

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
        Select {category === 'activities' ? 'Tickets' : 'Seats'}
      </h1>
      {text && (
        <div
          style={{
            width: '100%',
            height: '50px',
            backgroundColor: '#f0f0f0',
            border: '2px solid #000',
            borderRadius: '5px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
          }}
        >
          {text}
        </div>
      )}
      {label && <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666' }}>{label}</p>}

      {/* Display Base Price */}
      <div style={{ textAlign: 'center', marginBottom: '20px', color: '#444', fontWeight: '500' }}>
        Price: 
        {category === 'activities' 
          ? `₹${basePrice.adult}/Adult, ₹${basePrice.child}/Child ${basePrice.label}`
          : `₹${basePrice.perSeat} ${basePrice.label}`}
          </div>

      {layout === 'seats' && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
          {Array.from({ length: 100 }, (_, i) => {
            const seatNumber = i + 1;
            const isSelected = selectedSeats.includes(seatNumber);
            const rowIndex = Math.floor(i / 10);
            const isEvenRow = rowIndex % 2 === 0;
            const isClickable = isEvenRow;

            return (
              <div
                key={i}
                onClick={isClickable ? () => handleSeatClick(seatNumber) : undefined}
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: isSelected ? '#4CAF50' : isEvenRow ? 'white' : '#ccc',
                  color: isSelected || !isEvenRow ? 'white' : 'black',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  cursor: isClickable ? 'pointer' : 'not-allowed',
                  opacity: isClickable ? 1 : 0.6,
                }}
              >
                {seatNumber}
              </div>
            );
          })}
        </div>
      )}

      {layout === 'stadium' && (
        <div style={{ textAlign: 'center', position: 'relative', marginBottom: '20px' }}>
          <div
            style={{
              width: '300px',
              height: '300px',
              backgroundColor: '#87CEEB',
              borderRadius: '50%',
              margin: '0 auto',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {Array.from({ length: 12 }, (_, i) => {
              const angle = (i / 12) * 2 * Math.PI;
              const radius = 180;
              const x = 150 + radius * Math.cos(angle);
              const y = 150 + radius * Math.sin(angle);
              const seatNumber = i + 1;
              const isSelected = selectedSeats.includes(seatNumber);
              const isClickable = true;

              return (
                <div
                  key={i}
                  onClick={isClickable ? () => handleSeatClick(seatNumber) : undefined}
                  style={{
                    position: 'absolute',
                    width: '40px',
                    height: '40px',
                    backgroundColor: isSelected ? '#4CAF50' : '#FFD700',
                    color: isSelected ? 'white' : 'black',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    cursor: isClickable ? 'pointer' : 'not-allowed',
                    left: `${x - 20}px`,
                    top: `${y - 20}px`,
                  }}
                >
                  {seatNumber}
                </div>
              );
            })}
          </div>
          <p style={{ marginTop: '10px', color: '#666' }}>Click stands to select seats</p>
        </div>
      )}

      {layout === 'tickets' && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              marginBottom: '20px',
            }}
          >
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Ticket Selection</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', color: '#444', marginBottom: '5px' }}>Adult Tickets</label>
                <select
                  value={adultTickets}
                  onChange={(e) => setAdultTickets(parseInt(e.target.value))}
                  style={{
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    width: '80px',
                  }}
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', color: '#444', marginBottom: '5px' }}>Child Tickets</label>
                <select
                  value={childTickets}
                  onChange={(e) => setChildTickets(parseInt(e.target.value))}
                  style={{
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    width: '80px',
                  }}
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
            </div>
            <p style={{ fontSize: '16px', color: '#333', fontWeight: '500' }}>
              Total Selected: {adultTickets + childTickets} ticket{(adultTickets + childTickets) !== 1 ? 's' : ''} | Price: ₹{calculateTotalPrice()}
            </p>
          </div>
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Inclusions</h2>
            <ul style={{ textAlign: 'left', marginLeft: '20px', color: '#555', lineHeight: '1.5' }}>
              <li>Entry to the activity</li>
              <li>Guided tour (where applicable)</li>
              <li>Basic equipment rental</li>
              <li>Refreshments (limited)</li>
            </ul>
          </div>
        </div>
      )}

      {(layout === 'seats' || layout === 'stadium') && (
        <div>
          <p style={{ color: '#333', marginBottom: '10px' }}>Selected Seats: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'} | Price: ₹{calculateTotalPrice()}</p>
          <button
  onClick={() => {
    alert('Proceeding to payment...');
    navigate(`/pay/${category}/${show}`);
  }}
  style={{
    padding: '10px 20px',
    backgroundColor: '#ff0000',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }}
>
  Proceed to Payment
</button>
        </div>
      )}
    </div>
  );
}

export default Booking;