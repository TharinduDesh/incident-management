import React, { useState } from 'react';
import './App.css';

// Dummy data for complaints
const initialComplaints = [
  { 
    id: 1, 
    customerName: 'John Doe', 
    address: '123 Main St', 
    contact: '123-456-7890', 
    description: 'Leak in the kitchen', 
    status: 'Open', 
    repairTeam: 'Team A', 
    incidentTitle: 'Kitchen Leak',
    category: 'Technical Issue',
    date: '2024-12-01'
  },
  { 
    id: 2, 
    customerName: 'Jane Smith', 
    address: '456 Elm St', 
    contact: '234-567-8901', 
    description: 'No hot water in the shower', 
    status: 'Open', 
    repairTeam: 'Team B', 
    incidentTitle: 'Hot Water Issue',
    category: 'Technical Issue',
    date: '2024-12-02'
  },
  { 
    id: 3, 
    customerName: 'Michael Johnson', 
    address: '789 Oak St', 
    contact: '345-678-9012', 
    description: 'Electrical issue in living room', 
    status: 'Processing', 
    repairTeam: 'Team A', 
    incidentTitle: 'Electrical Issue',
    category: 'Safety Incident',
    date: '2024-12-03'
  },
];

// Dummy repair teams (for display purposes)
const repairTeams = ['Team A', 'Team B', 'Team C'];

function RepairTeamDashboard() {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [selectedTeam, setSelectedTeam] = useState('Team A'); // Default to Team A
  const [statusFilter, setStatusFilter] = useState('All'); // State to track selected filter

  // Function to update complaint status (Processing or Resolved)
  const updateStatus = (complaintId, newStatus) => {
    setComplaints(complaints.map(complaint => {
      if (complaint.id === complaintId) {
        return { ...complaint, status: newStatus };
      }
      return complaint;
    }));
  };

  // Get all complaints assigned to the selected team
  const assignedComplaints = complaints.filter(complaint => complaint.repairTeam === selectedTeam);

  // Apply status filter if selected
  const filteredComplaints = statusFilter === 'All'
    ? assignedComplaints
    : assignedComplaints.filter(complaint => complaint.status === statusFilter);

  // Get the counts for status filter (Open, Processing, Resolved)
  const statusCounts = {
    Assigned: assignedComplaints.length,
    Open: assignedComplaints.filter(complaint => complaint.status === 'Open').length,
    Processing: assignedComplaints.filter(complaint => complaint.status === 'Processing').length,
    Resolved: assignedComplaints.filter(complaint => complaint.status === 'Resolved').length,
  };

  return (
    <div className="App">
      <h1>Repair Team Dashboard - Incident Management System</h1>

      {/* Tabs for selecting teams */}
      <div className="tabs">
        {repairTeams.map(team => (
          <button 
            key={team}
            onClick={() => setSelectedTeam(team)}
            className={selectedTeam === team ? 'active' : ''}
          >
            {team}
          </button>
        ))}
      </div>

      <h2>Assigned Complaints for {selectedTeam}</h2>

      {/* Filter Information */}
      <div>
        <p><strong>Assigned Complaints:</strong> {statusCounts.Assigned}</p>
        <p><strong>Open/New:</strong> {statusCounts.Open}</p>
        <p><strong>Processing:</strong> {statusCounts.Processing}</p>
        <p><strong>Resolved:</strong> {statusCounts.Resolved}</p>

        {/* Status Filter Dropdown */}
        <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
          <option value="All">All</option>
          <option value="Open">Open</option>
          <option value="Processing">Processing</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* Render the filtered complaints */}
      <ul>
        {filteredComplaints.map(complaint => (
          <li key={complaint.id}>
            <p><strong>Incident Title:</strong> {complaint.incidentTitle}</p>
            <p><strong>Description:</strong> {complaint.description}</p>
            <p><strong>Category:</strong> {complaint.category}</p>
            <p><strong>Date:</strong> {complaint.date}</p>
            <p><strong>Contact:</strong> {complaint.customerName}, {complaint.contact}</p>
            <p><strong>Address:</strong> {complaint.address}</p>
            <p><strong>Status:</strong> {complaint.status}</p>

            {/* Buttons to change status with dynamic class based on status */}
            {complaint.status === 'Open' && (
              <button 
                className="status-button open" 
                onClick={() => updateStatus(complaint.id, 'Processing')}
              >
                Start Work
              </button>
            )}
            {complaint.status === 'Processing' && (
              <button 
                className="status-button processing" 
                onClick={() => updateStatus(complaint.id, 'Resolved')}
              >
                Mark as Resolved
              </button>
            )}
            {complaint.status === 'Resolved' && (
              <button className="status-button resolved" disabled>
                Completed
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RepairTeamDashboard;
