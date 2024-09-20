// src/components/AddRecord.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddRecord() {
  const [formData, setFormData] = useState({
    date: '',
    bodyTemperature: '',
    bloodPressure: '',
    heartRate: ''
  });
  const navigate = useNavigate();

  const { date, bodyTemperature, bloodPressure, heartRate } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!date || !bodyTemperature || !bloodPressure || !heartRate) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/health-records', formData);
      alert('Health record added successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error adding record:', error);
      alert('Failed to add health record.');
    }
  };

  return (
    <div>
      <h2>Add Health Record</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={date}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Body Temperature (°F):</label>
          <input
            type="number"
            step="0.1"
            className="form-control"
            name="bodyTemperature"
            value={bodyTemperature}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Blood Pressure (systolic/diastolic):</label>
          <input
            type="text"
            className="form-control"
            name="bloodPressure"
            value={bloodPressure}
            onChange={onChange}
            placeholder="e.g., 120/80"
            required
          />
        </div>
        <div className="form-group">
          <label>Heart Rate (bpm):</label>
          <input
            type="number"
            className="form-control"
            name="heartRate"
            value={heartRate}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success mt-3">Submit</button>
      </form>
    </div>
  );
}

export default AddRecord;
