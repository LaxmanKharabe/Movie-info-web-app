import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AuthService from '../../AuthService';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/slice/authSlice'
import './login.css';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const user = await AuthService.login({ username, password });
      if (user) {
        dispatch(login({ username }));
        navigate('/home');
      } else {
        setError('Invalid username or password. Please details again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login. Please try again.');
    }
  };
  return (
    <div className='login-container'>
      <div className="container">
        <h2 style={{textAlign: "center", marginBottom: "5px"}}>Login</h2>
        {error && <span style={{ color: 'red'}}>{error}</span>}
        <div className="userName">
          <input className='inputBox' placeholder='User name' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="password">
          <input type="password" className='inputBox' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='buttons'>
          <button className="btn-login" onClick={handleLogin}>Login</button>
          <a onClick={() => navigate('/signup')}>Don't have an account? <span className='text-sm'>Signup</span></a>
        </div>
      </div>
    </div>
  );
};
export default Login;