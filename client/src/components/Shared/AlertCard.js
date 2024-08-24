import React from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const alerts = [
  {
    id: 1,
    title: "Urgent Blood Need",
    message:
      "We need O-negative blood urgently at City Hospital. Please come forward if you are eligible.",
  },
  {
    id: 2,
    title: "Critical Blood Shortage",
    message:
      "There is a critical shortage of B-positive blood. Please visit the nearest blood bank to donate.",
  },
];

const AlertCard = () => (
  <div>
    {alerts.map((alert) => (
      <Card
        key={alert.id}
        sx={{
          maxWidth: 600,
          backgroundColor: "#fff",
          color: "#0d47a1",
          borderRadius: 3,
          borderLeft: "6px solid #d32f2f",
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
          position: "relative",
          overflow: "visible",
          mb: 4,
        }}
      >
        <CardContent sx={{ display: "flex", alignItems: "center" }}>
          <WarningIcon sx={{ fontSize: 40, color: "#d32f2f", mr: 2 }} />
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              {alert.title}
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
              {alert.message}
            </Typography>
          </Box>
          <Box>
            <IconButton sx={{ color: "#0d47a1" }} onClick={() => console.log(`Notified about alert: ${alert.title}`)}>
              <NotificationsActiveIcon />
            </IconButton>
            <IconButton sx={{ color: "#d32f2f" }} onClick={() => console.log(`Closed alert: ${alert.title}`)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default AlertCard;
