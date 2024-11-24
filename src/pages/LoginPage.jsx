import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import '../LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (email === 'admin@gmail.com') {
        navigate('/admin');  
      } else {
        navigate('/'); 
      }
    } catch (error) {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login to SwiftCart</h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account?{' '}
        <Link to="/signup" className="signup-link">Sign Up</Link>
      </p>
    </div>
  );
};

export default LoginPage;
