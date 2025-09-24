import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Dashboard } from './pages/Dashboard';
import { Budget } from './pages/Budget';
import { Resgister } from './pages/Register';
import { Login } from './pages/Login';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Resgister />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
