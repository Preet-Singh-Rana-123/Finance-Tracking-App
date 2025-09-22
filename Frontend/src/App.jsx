import { useState } from 'react';
import { Dashboard } from './pages/Dashboard';
import { Navbar } from './components/Navbar';
import { Budget } from './pages/Budget';

function App() {
  return (
    <>
      <Navbar />
      {/* <Dashboard /> */}
      <Budget />
    </>
  );
}

export default App;
