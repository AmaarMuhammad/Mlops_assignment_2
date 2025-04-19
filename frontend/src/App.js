import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://auth-service/api/signup', { email, password });
      setMessage('Signup successful!');
    } catch (error) {
      setMessage('Signup failed: ' + error.response.data.message);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://auth-service/api/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setUser({ email });
      setMessage('Login successful!');
    } catch (error) {
      setMessage('Login failed: ' + error.response.data.message);
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('http://auth-service/api/forgot-password', { email });
      setMessage('Password reset email sent!');
    } catch (error) {
      setMessage('Failed to send reset email: ' + error.response.data.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Microservices App</h1>
        
        {user ? (
          <div>
            <p>Welcome, {user.email}!</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleSignup}>Signup</button>
            <button onClick={handleForgotPassword}>Forgot Password</button>
          </div>
        )}
        
        {message && <p>{message}</p>}
      </header>
    </div>
  );
}

export default App;