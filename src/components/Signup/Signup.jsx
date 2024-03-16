import React, { useState } from 'react';
import './signup.css';
import AuthService from '../../AuthService';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (value) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{1,8}$/;
    const isValid = regex.test(value);

    if (!isValid) {
      setUsernameError('Username must be 1 to 8 characters long, with at least one uppercase letter and one lowercase letter.');
    } else {
      setUsernameError('');
    }
    setUsername(value);
  };

  const handleEmailChange = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(value);

    if (!isValidEmail) {
      setEmailError('Invalid email address. Please enter a valid email.');
    } else {
      setEmailError('');
    }

    setEmail(value);
  };

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUsername = users.some((user) => user.username === username);
    const existingEmail = users.some((user) => user.email === email);

    if (existingUsername) {
      setUsernameError('Username is already taken. Please choose another.');
      return;
    }

    if (existingEmail) {
      setEmailError('Email is already registered. Please choose another.');
      return;
    }

    AuthService.signup({ username, email, password });
  };

  return (
    <div>
      <form className='login-container'>
        <h2>Signup</h2>
        <div className="message">
          {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}
        </div>
        <input type="text" className='inputBox' value={username} placeholder="Username" required onChange={(e) => handleUsernameChange(e.target.value)} />
        <input type="email" className='inputBox' value={email} placeholder="E-mail" required onChange={(e) => handleEmailChange(e.target.value)} />
        {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
        <input type="password" className='inputBox' placeholder="Password" value={password} required onChange={(e) => setPassword(e.target.value)} />
        <button type="button" className="btn-login" onClick={handleSignup}>Signup</button>
        <a onClick={() => { navigate("/") }}>Don't have an account? <span className='text-sm'>Login</span></a>
      </form>
    </div>
  );
};

export default Signup;