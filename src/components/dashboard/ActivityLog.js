import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const ActivityLog = () => {
  const activities = [
    { id: 1, action: "Updated profile details", time: "2024-12-01 10:30" },
    { id: 2, action: "Reported a new incident", time: "2024-12-01 12:15" },
    { id: 3, action: "Changed password", time: "2024-11-30 16:45" },
  ];

  return (
    <Card className="profile-card" style={{ marginTop: "20px" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Activity Log
        </Typography>

        <List>
          {activities.map((activity) => (
            <ListItem key={activity.id}>
              <ListItemText
                primary={activity.action}
                secondary={<Typography>{activity.time}</Typography>}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default ActivityLog;
