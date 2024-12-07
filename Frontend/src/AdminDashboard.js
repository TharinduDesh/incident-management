import React, { useState, useEffect } from 'react';
import './App.css';

const repairTeams = ['Team A', 'Team B', 'Team C'];

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]); // Initially an empty array
  const [activeTab, setActiveTab] = useState(1); // Tab 1 = New Complaints, Tab 2 = All Complaints
  const [statusFilter, setStatusFilter] = useState('All'); // Filter for status in Tab 2
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch complaints data from the API when the component mounts
  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true); // Set loading state
      try {
        const response = await fetch('http://127.0.0.1:5000/api/complaints');
        if (!response.ok) {
          throw new Error('Failed to fetch complaints data');
        }
        const data = await response.json();
        setComplaints(data); // Update state with fetched complaints
      } catch (error) {
        setError(error.message); // Set error message if fetching fails
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };

    fetchComplaints();
  }, []); // Empty dependency array means this runs only once after the initial render

  // Function to handle assigning a repair team and updating status to Open
  const assignRepairTeam = (complaintId, team) => {
    setComplaints(prevComplaints =>
      prevComplaints.map(complaint => {
        if (complaint.complaint_number === complaintId) {
          // Update the status to 'Open' and assign the repair team
          return { ...complaint, status: 'Open', repairTeam: team };
        }
        return complaint;
      })
    );
  };

  // Filter complaints in Tab 2 based on status
  const filteredComplaints = statusFilter === 'All'
    ? complaints
    : complaints.filter(complaint => complaint.status === statusFilter);

  // Get counts of complaints by status
  const statusCounts = {
    Open: complaints.filter(complaint => complaint.status === 'Open').length,
    Processing: complaints.filter(complaint => complaint.status === 'Processing').length,
    Resolved: complaints.filter(complaint => complaint.status === 'Resolved').length,
  };

  // If data is loading or an error occurs, show a message
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <h1>Admin Dashboard - Incident Management System</h1>

      {/* Tabs */}
      <div className="tabs">
        <button className={activeTab === 1 ? 'active' : ''} onClick={() => setActiveTab(1)}>
          New Complaints
        </button>
        <button className={activeTab === 2 ? 'active' : ''} onClick={() => setActiveTab(2)}>
          All Complaints
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Tab 1: New Complaints */}
        {activeTab === 1 && (
          <div>
            <h2>New Complaints</h2>
            <ul>
              {complaints.filter(complaint => !complaint.repairTeam).map(complaint => (
                <li key={complaint.complaint_number}>
                  <p><strong>Complaint Number:</strong> {complaint.complaint_number}</p>
                  <p><strong>Incident Title:</strong> {complaint.incidentTitle}</p>
                  <p><strong>Description:</strong> {complaint.description}</p>
                  <p><strong>Category:</strong> {complaint.category}</p>
                  <p><strong>Date:</strong> {complaint.date}</p>
                  <p><strong>Contact:</strong> {complaint.customerName}, {complaint.contactNumber}</p>
                  <p><strong>Address:</strong> {complaint.address}</p>
                  <select
                    onChange={(e) => assignRepairTeam(complaint.complaint_number, e.target.value)}
                    defaultValue=""
                  >
                    <option value="" disabled>Select Repair Team</option>
                    {repairTeams.map(team => (
                      <option key={team} value={team}>
                        {team}
                      </option>
                    ))}
                  </select>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tab 2: All Complaints */}
        {activeTab === 2 && (
          <div>
            <h2>All Complaints</h2>

            {/* Filter by Status */}
            <div>
              <label>Filter by Status: </label>
              <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
                <option value="All">All</option>
                <option value="Open">Open</option>
                <option value="Processing">Processing</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            {/* Status Counts */}
            <div>
              <p>Status Counts:</p>
              <ul>
                <li>Open: {statusCounts.Open}</li>
                <li>Processing: {statusCounts.Processing}</li>
                <li>Resolved: {statusCounts.Resolved}</li>
              </ul>
            </div>

            {/* List complaints */}
            <ul>
              {filteredComplaints.map(complaint => (
                <li key={complaint.complaint_number}>
                  <p><strong>Complaint Number:</strong> {complaint.complaint_number}</p>
                  <p><strong>Incident Title:</strong> {complaint.incidentTitle}</p>
                  <p><strong>Description:</strong> {complaint.description}</p>
                  <p><strong>Category:</strong> {complaint.category}</p>
                  <p><strong>Date:</strong> {complaint.date}</p>
                  <p><strong>Assigned to:</strong> {complaint.repairTeam}</p>
                  <p><strong>Status:</strong> {complaint.status}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;