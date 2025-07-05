import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './features/auth/authSlice';
import './Register.scss';

const AuthForm = () => {
  const dispatch = useDispatch();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
      if (existingUser.password === password) {
        alert('✅ Login successful!');
        dispatch(login({ email: existingUser.email }));
        setEmail('');
        setPassword('');
      } else {
        alert('❌ Incorrect password!');
      }
    } else {
      alert("⚠️ You're a new user. Please register first.");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
      alert('❗ User already exists. Please login.');
      return;
    }

    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('🎉 Signup successful! Please login.');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="auth-form-wrapper">
      {/* 🌟 Heading */}
      <h1 className="auth-heading">
        Stay Organized. Stay Creative. <br />
        Empower Your Daily Journey.
      </h1>

      {/* 🔄 Toggle Buttons + Form grouped together */}
      <div className="auth-box">
        <div className="auth-toggle-buttons">
          <button
            className={!isRegistering ? 'active' : ''}
            onClick={() => setIsRegistering(false)}
          >
            Login
          </button>
          <button
            className={isRegistering ? 'active' : ''}
            onClick={() => setIsRegistering(true)}
          >
            Register
          </button>
        </div>

        <form onSubmit={isRegistering ? handleRegister : handleLogin} className="auth-form">
          <h2>{isRegistering ? 'Register' : 'Login'}</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="auth-input"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="auth-input"
          />

          <button type="submit" className="auth-btn">
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>
      </div>

  
    </div>
  );
};

export default AuthForm;
