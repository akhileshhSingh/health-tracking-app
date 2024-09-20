// src/components/RecordDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function RecordDetail() {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecord();
    // eslint-disable-next-line
  }, []);

  const fetchRecord = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/health-records/${id}`);
      setRecord(response.data);
    } catch (error) {
      console.error('Error fetching record:', error);
      alert('Failed to fetch health record.');
      navigate('/');
    }
  };

  const deleteRecord = async () => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await axios.delete(`http://localhost:3000/health-records/${id}`);
        alert('Health record deleted successfully!');
        navigate('/');
      } catch (error) {
        console.error('Error deleting record:', error);
        alert('Failed to delete health record.');
      }
    }
  };

  if (!record) return <p>Loading...</p>;

  return (
    <div>
      <h2>Health Record Detail</h2>
      <ul className="list-group">
        <li className="list-group-item"><strong>Date:</strong> {new Date(record.date).toLocaleDateString()}</li>
        <li className="list-group-item"><strong>Body Temperature:</strong> {record.bodyTemperature}°F</li>
        <li className="list-group-item"><strong>Blood Pressure:</strong> {record.bloodPressure}</li>
        <li className="list-group-item"><strong>Heart Rate:</strong> {record.heartRate} bpm</li>
        <li className="list-group-item"><strong>Created At:</strong> {new Date(record.createdAt).toLocaleString()}</li>
        <li className="list-group-item"><strong>Updated At:</strong> {new Date(record.updatedAt).toLocaleString()}</li>
      </ul>
      <div className="mt-3">
        <button className="btn btn-primary mr-2" onClick={() => navigate(`/edit/${id}`)}>Edit</button>
        <button className="btn btn-danger" onClick={deleteRecord}>Delete</button>
      </div>
    </div>
  );
}

export default RecordDetail;
