import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to the Translation App</h1>
        <p>Your go-to app for managing and searching translations effortlessly.</p>
      </header>

      <div className="home-actions">
        <Link to="/login" className="btn btn-primary">Log In</Link>
        <Link to="/register" className="btn btn-secondary">Sign Up</Link>
      </div>
    </div>
  );
};

export default Home;
