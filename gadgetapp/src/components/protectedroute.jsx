import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import './css/loading.css';

import { BACKEND_URL } from '../config.json';

const ProtectedRoute = ({ redirectPath = '/login', children }) => {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const ws = new WebSocket(`ws://${BACKEND_URL}:5678?topic=verifyToken`);

    ws.onopen = () => {
      console.log("WebSocket Connected");
      ws.send(JSON.stringify({ topic: "verify-token", token: token }));
    };

    ws.onmessage = (message) => {
      console.log("WebSocket Message: ", message);
      const data = JSON.parse(message.data);
      if (data.message === 'success') {
        setIsTokenValid(true);
      } else {
        setIsTokenValid(false);
      }
      setIsLoading(false);
      ws.close(); // Close WebSocket connection
    };

    // Clean up WebSocket connection
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  if (isLoading) {
    return <div className="loading">
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{height: '100px', width: '100px'}}></span> 
            </div>;
  }

  if (isTokenValid) {
    return children;
  } else {
    return <Navigate to={redirectPath} replace />;
  }
};

export default ProtectedRoute;
