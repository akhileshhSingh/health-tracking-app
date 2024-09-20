// src/components/EditRecord.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditRecord() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    date: '',
    bodyTemperature: '',
    bloodPressure: '',
    heartRate: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecord();
    // eslint-disable-next-line
  }, []);

  const fetchRecord = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/health-records/${id}`);
      const { date, bodyTemperature, bloodPressure, heartRate } = response.data;
      setFormData({
        date: new Date(date).toISOString().split('T')[0],
        bodyTemperature,
        bloodPressure,
        heartRate
      });
    } catch (error) {
      console.error('Error fetching record:', error);
      alert('Failed to fetch health record.');
      navigate('/');
    }
  };

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
      await axios.put(`http://localhost:3000/health-records/${id}`, formData);
      alert('Health record updated successfully!');
      navigate(`/records/${id}`);
    } catch (error) {
      console.error('Error updating record:', error);
      alert('Failed to update health record.');
    }
  };

  return (
    <div>
      <h2>Edit Health Record</h2>
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
        <button type="submit" className="btn btn-primary mt-3">Update</button>
      </form>
    </div>
  );
}

export default EditRecord;
