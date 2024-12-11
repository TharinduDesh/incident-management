import React, { useState } from "react";
import "./Dashboard.css";
import hello from "../../assets/hello.svg";
import Chart from "../charts/Charts";

import SecuritySettings from "./SecuritySettings";
import ActivityLog from "./ActivityLog";
import AccountSettings from "./AccountSettings";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
} from "@mui/material";

const Dashboard = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [phone, setPhone] = useState("+1234567890");
  const [address, setAddress] = useState("123 Main St, City, Country");

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // You can add logic to save the updated profile information
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset values to original
    setName("John Doe");
    setEmail("johndoe@example.com");
    setPhone("+1234567890");
    setAddress("123 Main St, City, Country");
  };

  return (
    // Main
    <main>
      <div className="main__container">
        <div className="main__title">
          <img src={hello} alt="hello" />
          <div className="main__greeting">
            <h1>Hello!</h1>
            <p>Welcome to your dashboard</p>
          </div>
        </div>

        <div className="main__cards">
          <div className="card">
            <i className="fa-solid fa-user fa-2x text-lightblue"></i>
            <div className="card_inner">
              <p className="text-primary-p">Profile Plan</p>
              <span className="font-bold text-title"> T1</span>
            </div>
          </div>

          <div className="card">
            <i className="fa-solid fa-triangle-exclamation fa-2x text-red"></i>
            <div className="card_inner">
              <p className="text-primary-p">Pending Complains</p>
              <span className="font-bold text-title">2</span>
            </div>
          </div>

          <div className="card">
            <i className="fa-solid fa-spinner fa-2x text-yellow"></i>
            <div className="card_inner">
              <p className="text-primary-p">In Progress</p>
              <span className="font-bold text-title">1</span>
            </div>
          </div>

          <div className="card">
            <i className="fa-solid fa-check fa-2x text-green"></i>
            <div className="card_inner">
              <p className="text-primary-p">Resolved</p>
              <span className="font-bold text-title">14</span>
            </div>
          </div>
        </div>

        <Card className="profile-card">
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Personal Information
            </Typography>

            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              variant="outlined"
              disabled={!isEditing}
              margin="normal"
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              variant="outlined"
              disabled={!isEditing}
              margin="normal"
            />
            <TextField
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
              variant="outlined"
              disabled={!isEditing}
              margin="normal"
            />
            <TextField
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              variant="outlined"
              disabled={!isEditing}
              margin="normal"
            />

            <Box display="flex" justifyContent="space-between" marginTop="20px">
              {!isEditing ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEdit}
                >
                  Edit
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <SecuritySettings />

        {/* Activity Log */}
        <ActivityLog />

        {/* Account Settings */}
        <AccountSettings />
      </div>
    </main>
  );
};

export default Dashboard;
