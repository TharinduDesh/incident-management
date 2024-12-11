import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";

const SecuritySettings = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const handlePasswordChange = () => {
    console.log("Password changed:", oldPassword, newPassword);
  };

  const toggle2FA = () => {
    setIs2FAEnabled(!is2FAEnabled);
  };

  return (
    <Card className="profile-card" style={{ marginTop: "20px" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Security Settings
        </Typography>

        <TextField
          label="Old Password"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
        />

        <Box display="flex" justifyContent="space-between" marginTop="20px">
          <Button
            variant="contained"
            color="primary"
            onClick={handlePasswordChange}
          >
            Change Password
          </Button>
        </Box>

        <Box display="flex" justifyContent="space-between" marginTop="20px">
          <Typography variant="body1">
            Enable Two-Factor Authentication
          </Typography>
          <Button
            variant={is2FAEnabled ? "contained" : "outlined"}
            color="primary"
            onClick={toggle2FA}
          >
            {is2FAEnabled ? "Disable 2FA" : "Enable 2FA"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;
