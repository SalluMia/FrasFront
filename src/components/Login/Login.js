import React from 'react'
import { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import style from './style.css'
import axios from 'axios'
const Login= ()=> {
  const navigate=useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
        navigate('/home');
    }
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };

    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password },
        config
      );
      localStorage.setItem('authToken', data.token);
          navigate('/home');
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };
  return (
    <div>
      <div id="login">
        <div className="container mt-5 p-5 bg-light">
          <div className="login">
            <form onSubmit={loginHandler} className="login-screen__form">
              <h3 className="login-screen__title">Login</h3>
              {error && <span className="error-message">{error}</span>}
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email"
                  className='form-control'
                  value={email}
                  autoComplete="off"
                  tabIndex={1}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  Password:{' '}
                  <Link
                    to="/forgotpassword"
                    className="login-screen__forgotpassword"
                    tabIndex={4}
                  >
                    Forgot Password?
                  </Link>
                </label>
                <input
                  tabIndex={2}
                  type="password"
                  name="password"
                  className='form-control'
                  id="password"
                  autoComplete="off"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <br />
              <button type="submit" className="btn btn-primary" tabIndex={3}>
                Login
              </button>
              <span className="login-screen__subtext">
                Don't have an account?
                <Link to="/register" tabIndex={5}>
                  Register
                </Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
