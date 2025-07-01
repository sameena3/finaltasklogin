import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import './Auth.scss';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  const handleSignup = (e) => {
  e.preventDefault();

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const exists = users.find(u => u.email === email);

  if (exists) {
    alert('User already exists!');
    return;
  }

  const newUser = { email, password };
  localStorage.setItem('users', JSON.stringify([...users, newUser]));

  alert('Account created successfully! Please login.');
  navigate('/login');
};


  return (
    <div className="auth-form">
      <h2>Create Account</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          required value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
        <p>Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
};

export default Signup;
