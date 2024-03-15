import './App.css';
// import React, { useState, useEffect } from 'react';
import ConfigsAdmin from './admin/ConfigsAdmin';
import Home from './home/Home'
import LoginPage from './components/login';
import ProtectedRoute from './components/protectedroute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <ConfigsAdmin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
