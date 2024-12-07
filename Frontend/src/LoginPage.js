import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';


function LoginPage() {
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (userType === 'admin') {
      navigate('/admin');
    } else if (userType === 'repair') {
      navigate('/repair');
    } else if (userType === 'customer') {
      navigate('/customer');
    } else {
      alert('Please select a user type');
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <div>
        <label>
          <input
            type="radio"
            name="userType"
            value="admin"
            onChange={(e) => setUserType(e.target.value)}
          />
          Admin
        </label>
        <label>
          <input
            type="radio"
            name="userType"
            value="repair"
            onChange={(e) => setUserType(e.target.value)}
          />
          Repair Team
        </label>
        <label>
          <input
            type="radio"
            name="userType"
            value="customer"
            onChange={(e) => setUserType(e.target.value)}
          />
          Customer
        </label>
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
