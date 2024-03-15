import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './css/login.css';
import image from '../images/lmi.png'
import Button from 'react-bootstrap/Button';

import { BACKEND_URL } from '../config.json';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginFail, setLoginFail] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true)
    const ws = new WebSocket(`ws:${BACKEND_URL}:5678?topic=login`);

    ws.onopen = () => {
      console.log("WebSocket Connected");
      ws.send(JSON.stringify({topic: "login", username: username, password: password}));
    };

    ws.onmessage = (message) => {
      console.log("WebSocket Message: ", message);
      const data = JSON.parse(message.data);
      setLoading(false)
      if (data.message == 'success') {
        localStorage.setItem('authToken', data.token);
        navigate('/admin');
      } else {
        setLoginFail(true);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error: ", error);
      ws.close();
    };

  };

  return (
    <div className="login-page">
      <div className="login-container">
       <div><h2 className="login-title">GadgetApp Admin Login</h2></div>
      <div  className="lmi-logo-container"> 
        <img src={image} alt="LMI Technologies" className='lmi-logo'/>
      </div>
       <div className="form-container">
          <label className="error-message" hidden={!loginFail}>*Username or Password is incorrect</label>
          <form className="login-form" onSubmit={handleSubmit}>
            <label className="login-form-label" htmlFor="username">Username: </label>
            <div className="form-group">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <label className="login-form-label" htmlFor="password">Password: </label>
            <div className="form-group">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="login-button-container">
              <Button type="submit" style={{ width: "50%" }}>
                { loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Login" }
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
