// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddRecord from './components/AddRecord';
import RecordDetail from './components/RecordDetail';
import EditRecord from './components/EditRecord';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddRecord />} />
          <Route path="/records/:id" element={<RecordDetail />} />
          <Route path="/edit/:id" element={<EditRecord />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

