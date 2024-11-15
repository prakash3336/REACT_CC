import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';
import './styles/App.css';
import './styles/Homepage.css';
import './styles/LoginPage.css';
import './styles/SignupPage.css';

// Homepage Component
const Homepage = () => (
  <div className="homepage-container">
    <h1 className="homepage-heading">Welcome to Our Restaurant</h1>
    <p className="homepage-paragraph">Explore our menu and enjoy a wonderful dining experience!</p>
    <nav className="homepage-nav">
      <Link to="/login" className="homepage-link">Login</Link>
      <Link to="/signup" className="homepage-link">Signup</Link>
    </nav>
  </div>
);

// Login Page Component
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logged in with Email: ${email}`);
    navigate('/');
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-form-group">
          <label htmlFor="email" className="login-label">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="password" className="login-label">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

// Signup Page Component
const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    alert(`Signed up with Email: ${email}`);
    navigate('/');
  };

  return (
    <div className="signup-container">
      <h2 className="signup-heading">Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="signup-form-group">
          <label htmlFor="email" className="signup-label">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-input"
            required
          />
        </div>
        <div className="signup-form-group">
          <label htmlFor="password" className="signup-label">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-input"
            required
          />
        </div>
        <div className="signup-form-group">
          <label htmlFor="confirmPassword" className="signup-label">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="signup-input"
            required
          />
        </div>
        <button type="submit" className="signup-button">Signup</button>
      </form>
    </div>
  );
};

// App Component with Routing
const App = () => {
  const location = useLocation();

  return (
    <div className="app-container">
      {location.pathname === '/' && <Homepage />}
      {location.pathname === '/login' && <LoginPage />}
      {location.pathname === '/signup' && <SignupPage />}
    </div>
  );
};

// Render the application
ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<App />} />
      <Route path="/signup" element={<App />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
