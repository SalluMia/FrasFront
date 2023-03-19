import React from 'react'
import { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'
function Register() {
    const navigate=useNavigate()

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
  
    useEffect(() => {
      if (localStorage.getItem('authToken')) {
            navigate('/login');
      }
    }, []);
  
    const registerHandler = async (e) => {
      e.preventDefault();
      const config = {
        headers: {
          'content-type': 'application/json',
        },
      };
      if (password !== confirmPassword) {
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          setError('');
        }, 5000);
        return setError('Passwords do not match');
      }
      try {
        const { data } = await axios.post(
          'http://localhost:5000/api/auth/register',
          { username, email, password },
          config
        );
        localStorage.setItem('authToken', data.token);
            navigate('/login');
      } catch (error) {
        setError(error.response.data.error);
        setTimeout(() => {
          setError('');
        }, 5000);
      }
    };
    return (
        <div>
            <div id="registration" className='p-5'>
                <div className="container  p-5 bg-light">
                    <div className="col-sm-6">
                    <form onSubmit={registerHandler} className="register-screen__form">
                        <h3 className="register-screen__title">Register</h3>
                        {error && <span className="error-message">{error}</span>}
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className='form-control'
                                autoComplete='off'
                                
                                required
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter Email"
                                autoComplete='off'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='form-control'
                                required
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className='form-control'
                                placeholder="Enter Password"
                                value={password}
                                autoComplete='off'

                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <input
                                type="password"
                                name="confirm"
                                id="confirm"
                                className='form-control'
                                autoComplete='off'
                                placeholder="Enter Password Again"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <br />
                        <button type="submit" className="btn btn-primary">
                            Register
                        </button>
                        <span className="register-screen__subtext">
                            Already have an account?<Link to="/login">Login</Link>
                        </span>
                    </form>
                    </div>
                  
                </div>
            </div>
        </div>
    )
}

export default Register
