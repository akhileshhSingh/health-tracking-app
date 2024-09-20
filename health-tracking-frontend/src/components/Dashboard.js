// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredRecords, setFilteredRecords] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [search, records]);

  const fetchRecords = async () => {
    try {
      const response = await axios.get('http://localhost:3000/health-records');
      setRecords(response.data);
      setFilteredRecords(response.data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const deleteRecord = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await axios.delete(`http://localhost:3000/health-records/${id}`);
        setRecords(records.filter(record => record._id !== id));
      } catch (error) {
        console.error('Error deleting record:', error);
      }
    }
  };

  const handleSearch = () => {
    if (search.trim() === '') {
      setFilteredRecords(records);
    } else {
      const lowercasedSearch = search.toLowerCase();
      const filtered = records.filter(record => {
        const date = new Date(record.date).toLocaleDateString();
        const temp = record.bodyTemperature.toString();
        const bp = record.bloodPressure.toLowerCase();
        const hr = record.heartRate.toString();
        return (
          date.includes(lowercasedSearch) ||
          temp.includes(lowercasedSearch) ||
          bp.includes(lowercasedSearch) ||
          hr.includes(lowercasedSearch)
        );
      });
      setFilteredRecords(filtered);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by date, temperature, blood pressure, or heart rate..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {filteredRecords.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Body Temperature</th>
              <th>Blood Pressure</th>
              <th>Heart Rate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map(record => (
              <tr key={record._id}>
                <td>{new Date(record.date).toLocaleDateString()}</td>
                <td>{record.bodyTemperature}°F</td>
                <td>{record.bloodPressure}</td>
                <td>{record.heartRate} bpm</td>
                <td>
                  <Link to={`/records/${record._id}`} className="btn btn-primary btn-sm mr-2">View</Link>
                  <button onClick={() => deleteRecord(record._id)} className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No health records found.</p>
      )}
    </div>
  );
}

export default Dashboard;
