import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
} from "@mui/material";

const AccountSettings = () => {
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleNotificationChange = (event) => {
    setNotifications(event.target.checked);
  };

  return (
    <Card className="profile-card" style={{ marginTop: "20px" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Account Settings
        </Typography>

        <FormControl fullWidth margin="normal">
          <InputLabel>Language</InputLabel>
          <Select value={language} onChange={handleLanguageChange}>
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="es">Spanish</MenuItem>
            <MenuItem value="fr">French</MenuItem>
          </Select>
        </FormControl>

        <Box display="flex" justifyContent="space-between" marginTop="20px">
          <Typography variant="body1">Dark Mode</Typography>
          <Switch checked={theme === "dark"} onChange={handleThemeChange} />
        </Box>

        <Box display="flex" justifyContent="space-between" marginTop="20px">
          <Typography variant="body1">Enable Notifications</Typography>
          <Switch checked={notifications} onChange={handleNotificationChange} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default AccountSettings;
