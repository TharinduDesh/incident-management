import React, { useState } from 'react';
import './CustomerDashboard.css';

const CustomerDashboard = () => {
  const [complaint, setComplaint] = useState({
    customerName: '',
    address: '',
    contactNumber: '',
    incidentTitle: '',
    description: '',
    category: '',
    date: '',
  });

  const handleChange = (e) => {
    setComplaint({
      ...complaint,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Check if all required fields are filled before submitting
    if (!complaint.customerName || !complaint.address || !complaint.contactNumber || !complaint.incidentTitle || !complaint.description || !complaint.category || !complaint.date) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/complaints', { // Correct API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(complaint),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Complaint submitted successfully!');
        // Reset the form after successful submission
        setComplaint({
          customerName: '',
          address: '',
          contactNumber: '',
          incidentTitle: '',
          description: '',
          category: '',
          date: '',
        });
      } else {
        const error = await response.text();
        console.error('Error submitting complaint:', error);
        alert('Error submitting complaint. Please try again later.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Error submitting complaint. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Customer Dashboard</h1>
      <h3>Customer Complaint Form</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Customer Name</label>
          <input
            type="text"
            name="customerName"
            value={complaint.customerName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={complaint.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={complaint.contactNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Incident Title</label>
          <input
            type="text"
            name="incidentTitle"
            value={complaint.incidentTitle}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={complaint.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category</label>
          <select
            name="category"
            value={complaint.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Technical Issue">Technical Issue</option>
            <option value="Safety Incident">Safety Incident</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={complaint.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Submit Complaint</button>
        </div>
      </form>
    </div>
  );
};

export default CustomerDashboard;