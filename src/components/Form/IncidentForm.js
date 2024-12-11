import React, { useState } from "react";
import axios from "axios";
import "./IncidentForm.css";

const IncidentForm = () => {
  const [incidentDetails, setIncidentDetails] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    customerName: "",
    address: "",
    contactNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIncidentDetails({
      ...incidentDetails,
      [name]: value,
    });
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all fields?")) {
      setIncidentDetails({
        customerName: "",
        address: "",
        contactNumber: "",
        title: "",
        description: "",
        category: "",
        date: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (
      !incidentDetails.title ||
      !incidentDetails.description ||
      !incidentDetails.category ||
      !incidentDetails.date
    ) {
      alert("Please fill in all fields!");
      setIsSubmitting(false);
      return;
    }

    const incidentData = {
      title: incidentDetails.title,
      description: incidentDetails.description,
      category: incidentDetails.category,
      date: incidentDetails.date,
      customer_name: incidentDetails.customerName,
      address: incidentDetails.address,
      contact_number: incidentDetails.contactNumber,
    };

    axios
      .post("http://localhost:5000/submit-incident", incidentData)
      .then((response) => {
        setIsSubmitting(false);
        alert("Incident reported successfully!");
      })
      .catch((error) => {
        setIsSubmitting(false);
        alert("Failed to report incident.");
      });
  };

  return (
    <div className="incident-form-container">
      <h2>Report an Incident</h2>
      <form onSubmit={handleSubmit}>
        <h3>Your Details</h3>
        <div className="form-group">
          <label htmlFor="customerName">Customer Name</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={incidentDetails.customerName}
            onChange={handleInputChange}
            required
            aria-label="Customer Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={incidentDetails.address}
            onChange={handleInputChange}
            required
            aria-label="Address"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={incidentDetails.contactNumber}
            onChange={handleInputChange}
            required
            aria-label="Contact Number"
          />
        </div>

        <h3>Incident Details</h3>

        <div className="form-group">
          <label htmlFor="title">Incident Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={incidentDetails.title}
            onChange={handleInputChange}
            required
            aria-label="Incident Title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={incidentDetails.description}
            onChange={handleInputChange}
            required
            aria-label="Description"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={incidentDetails.category}
            onChange={handleInputChange}
            required
            aria-label="Category"
          >
            <option value="">Select Category</option>
            <option value="technical">Technical Issue</option>
            <option value="safety">Safety Incident</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={incidentDetails.date}
            onChange={handleInputChange}
            required
            aria-label="Date"
          />
        </div>

        <button type="submit" className="btn-submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

        <button type="button" className="btn-clear" onClick={handleClear}>
          Clear
        </button>
      </form>
    </div>
  );
};

export default IncidentForm;
