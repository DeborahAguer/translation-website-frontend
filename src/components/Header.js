import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, loading, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogoutAndRedirect = () => {
    handleLogout();
    navigate('/login');
  };

  if (loading) {
    return <div>Loading...</div>; // Wait until the context loading is finished
  }

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>
            <Link to="/">Dinkaslate</Link>
          </h1>
        </div>
        <nav className="nav">
          <ul>
            {user?.token ? (
              <>
                <li>
                  <span className="username">Hello, {user?.name || 'User'}</span> {/* Display username */}
                </li>
                <li>
                  <button onClick={handleLogoutAndRedirect} className="logout-btn">Logout</button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
