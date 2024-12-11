import React, { useState, useEffect } from "react";
import axios from "axios";
import "../view/ViewIncident.css";

const ViewIncident = () => {
  const [incidents, setIncidents] = useState([]);
  const [filteredIncidents, setFilteredIncidents] = useState([]); // Keep this state for filtered incidents
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [selectedCategory, setSelectedCategory] = useState(""); // State for filter by category

  // Fetch incidents automatically when the component is mounted
  useEffect(() => {
    setLoading(true);
    setError(null); // Reset previous error

    axios
      .get("http://localhost:5000/get-incidents")
      .then((response) => {
        console.log("Fetched incidents:", response.data); // Debug log
        setIncidents(response.data); // Set the incidents to state
        setFilteredIncidents(response.data); // Initially show all incidents
      })
      .catch((error) => {
        console.error("Error fetching incidents:", error);
        setError("Failed to fetch incidents.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // Empty dependency array means this runs once when the component is mounted

  // Filter incidents based on search term and selected category
  const filterIncidents = (searchTerm, category) => {
    const filtered = incidents.filter((incident) => {
      const matchesSearchTerm =
        incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = category ? incident.category === category : true; // If no category is selected, show all

      return matchesSearchTerm && matchesCategory;
    });

    setFilteredIncidents(filtered); // Update the filtered incidents state
  };

  // Handle Search Input Change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterIncidents(e.target.value, selectedCategory); // Apply filter on search term change
  };

  // Handle Category Filter Change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    filterIncidents(searchTerm, e.target.value); // Apply filter on category change
  };

  return (
    <main>
      <div className="main__container">
        <h1>All Incidents</h1>
        {loading && <p className="loading">Loading...</p>}{" "}
        {/* Show loading state */}
        {error && <p className="error">{error}</p>}{" "}
        {/* Show error message if there was an issue */}
        {/* Search Input */}
        <div className="search-filter-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search incidents..."
            value={searchTerm}
            onChange={handleSearchChange} // Trigger filtering when the user types
          />
          {/* Category Filter */}
          <select
            className="category-select"
            value={selectedCategory}
            onChange={handleCategoryChange} // Trigger filtering when category changes
          >
            <option value="">All Categories</option>
            <option value="technical">Technical Issue</option>
            <option value="safety">Safety Incident</option>
            <option value="other">Other</option>
          </select>
        </div>
        {/* Render the grid if there are incidents */}
        {filteredIncidents.length === 0 && !loading && !error ? (
          <p>No incidents reported yet.</p>
        ) : (
          <div className="incident-grid">
            {filteredIncidents.map((incident) => (
              <div key={incident._id} className="incident-card">
                <h2>{incident.title}</h2>
                <p>
                  <strong>Category:</strong> {incident.category}
                </p>
                <p>
                  <strong>Description:</strong> {incident.description}
                </p>
                <p>
                  <strong>Date:</strong> {incident.date}
                </p>
                <p>
                  <strong>Customer Name:</strong> {incident.customer_name}
                </p>
                <p>
                  <strong>Contact Number:</strong> {incident.contact_number}
                </p>
                <p>
                  <strong>Address:</strong> {incident.address}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default ViewIncident;
