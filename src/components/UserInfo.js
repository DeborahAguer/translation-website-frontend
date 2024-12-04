import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './UserInfo.css';

const UserInfo = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>Loading user information...</p>;
  }

  return (
    <div className="user-info">
      <h3>User Information</h3>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default UserInfo;
