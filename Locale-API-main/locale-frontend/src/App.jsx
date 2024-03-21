import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [regions, setRegions] = useState([]);
  const [states, setStates] = useState([]);
  const [lgas, setLgas] = useState([]);
  const [showAuthSection, setShowAuthSection] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    // Fetch regions, states, and lgas from an API or data source
    fetchRegions();
    fetchStates();
    fetchLgas();
  }, []);

  const fetchRegions = async () => {
    try {
      const response = await fetch('http://localhost:5000/data/regions');
      const data = await response.json();
      setRegions(data);
    } catch (error) {
      console.error('Error fetching regions:', error);
    }
  };

  const fetchStates = async () => {
    try {
      const response = await fetch('http://localhost:5000/data/states');
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchLgas = async () => {
    try {
      const response = await fetch('http://localhost:5000/data/lgas');
      const data = await response.json();
      setLgas(data);
    } catch (error) {
      console.error('Error fetching lgas:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegisterClick = () => {
    setShowAuthSection(true);
  };

  const handleLoginClick = () => {
    setShowAuthSection(true);
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log('Registration successful:', data);
      // Handle successful registration
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log('Login successful:', data);
      // Handle successful login
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <>
      <header>
        <nav>
          <div className="brand">
            <a href="#">Locale App</a>
          </div>
          <div className="auth-links">
            <a href="#" id="register-link" onClick={handleRegisterClick}>
              Register
            </a>
            <a href="#" id="login-link" onClick={handleLoginClick}>
              Login
            </a>
          </div>
        </nav>
      </header>
      <main>
        <section id="data-section">
          <h2>Regions</h2>
          <div id="regions">
            {regions.map((region) => (
              <div key={region.id}>{region.name}</div>
            ))}
          </div>
          <h2>States</h2>
          <div id="states">
            {states.map((state) => (
              <div key={state.id}>{state.name}</div>
            ))}
          </div>
          <h2>LGAs</h2>
          <div id="lgas">
            {lgas.map((lga) => (
              <div key={lga.id}>{lga.name}</div>
            ))}
          </div>
        </section>
        <section id="auth-section" className={showAuthSection ? '' : 'hidden'}>
          <div id="register-form" className="auth-form">
            <h3>Register</h3>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button id="register-btn" onClick={handleRegister}>
              Register
            </button>
          </div>
          <div id="login-form" className="auth-form">
            <h3>Login</h3>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button id="login-btn" onClick={handleLogin}>
              Login
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default App;