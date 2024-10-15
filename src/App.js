import React, { useState, useEffect } from 'react';

function App() {
  // Mock user data for login
  const users = [{ email: 'user@example.com', password: 'password123' }];
  const [user, setUser] = useState(null); // Tracks logged-in user
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Event data (mocking API fetch)
  useEffect(() => {
    const fetchEvents = () => {
      setLoading(true);
      setTimeout(() => {
        setEvents([
          {
            id: 1,
            title: 'Music Concert',
            description: 'An amazing live music event!',
            category: 'Music',
            date: '2024-10-20',
            availableSeats: 20,
            price: 50,
          },
          {
            id: 2,
            title: 'Tech Conference',
            description: 'Learn about the latest in tech!',
            category: 'Technology',
            date: '2024-11-01',
            availableSeats: 10,
            price: 100,
          },
          // Add more events if needed
        ]);
        setLoading(false);
      }, 1000);
    };
    fetchEvents();
  }, []);

  // Login handling
  const handleLogin = () => {
    const validUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (validUser) {
      setUser(validUser);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials');
    }
  };

  // Event booking
  const bookEvent = (id) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id && event.availableSeats > 0
          ? { ...event, availableSeats: event.availableSeats - 1 }
          : event
      )
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Login Form (MANDATORY before accessing events) */}
      {!user ? (
        <div>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
        </div>
      ) : (
        <>
          <div>
            <h2>Welcome, {user.email}</h2>
            <button onClick={() => setUser(null)}>Logout</button>
          </div>

          {/* Event List */}
          <div>
            <h1>Events</h1>
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {loading ? (
              <p>Loading events...</p>
            ) : (
              <ul>
                {events
                  .filter((event) =>
                    event.title.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((event) => (
                    <li key={event.id} style={{ marginBottom: '20px' }}>
                      <h3>{event.title}</h3>
                      <p>{event.description}</p>
                      <p>Category: {event.category}</p>
                      <p>Date: {event.date}</p>
                      <p>Price: ${event.price}</p>
                      <p>Available Seats: {event.availableSeats}</p>
                      {event.availableSeats > 0 ? (
                        <button onClick={() => bookEvent(event.id)}>
                          Book Ticket
                        </button>
                      ) : (
                        <p style={{ color: 'red' }}>Sold Out</p>
                      )}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
