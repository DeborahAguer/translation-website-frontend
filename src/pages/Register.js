import React, { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword, validatePasswordsMatch, validateRequired } from '../utils/validators';
import './Register.css'; 

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Form validation
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long and contain a number, an uppercase letter, and a special character.');
      return;
    }
    if (!validatePasswordsMatch(password, confirmPassword)) {
      setError('Passwords do not match.');
      return;
    }
    if (!validateRequired(username) || !validateRequired(password) || !validateRequired(confirmPassword)) {
      setError('All fields are required.');
      return;
    }

    const userData = { username, email, password };
    try {
      const response = await register(userData);
      console.log('Registration successful:', response);
      navigate('/login'); // Redirect to login on success
    } catch (error) {
      setError(error.message); // Display meaningful error from backend
      console.error('Registration error:', error.message);
    }
    
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="register-form">
        {/* Username Field */}
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* Email Field */}
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Field */}
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Confirm Password Field */}
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* Show Password Checkbox */}
        <div>
          <label htmlFor="showPassword" className="checkbox-label">
            <input
              type="checkbox"
              id="showPassword"
              className="checkbox-input"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </label>
        </div>
        {/* Error Message */}
        {error && <p className="error">{error}</p>}

        {/* Submit Button */}
        <button type="submit" className="submit-btn">Register</button>
      </form>
    </div>
  );
};

export default Register;
