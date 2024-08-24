import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Avatar,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";

const events = [
  {
    id: 1,
    eventTitle: "Blood Donation Camp",
    hostInfo: "Red Cross Society",
    description:
      "Join us for a blood donation camp to help those in need. Your contribution can save lives!",
    imageUrl: "https://via.placeholder.com/600x250",
    eventDate: "August 30, 2024",
    eventTime: "10:00 AM",
    eventLocation: "Community Center, Main Street",
    registrationLink: "https://example.com/register",
  },
  {
    id: 2,
    eventTitle: "Emergency Blood Drive",
    hostInfo: "Local Hospital",
    description:
      "Urgent need for blood donations due to recent emergencies. Please come and donate!",
    imageUrl: "https://via.placeholder.com/600x250",
    eventDate: "September 5, 2024",
    eventTime: "9:00 AM",
    eventLocation: "City Hospital",
    registrationLink: "https://example.com/register",
  },
];

const EventCard = () => (
  <div>
    {events.map((event) => (
      <Card
        key={event.id}
        sx={{
          maxWidth: 600,
          backgroundColor: "#f5f5f5",
          color: "#0d47a1",
          borderRadius: 3,
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
          mb: 4,
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar sx={{ backgroundColor: "#0d47a1", mr: 2 }}>
              {event.eventTitle[0]}
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5 }}>
                {event.eventTitle}
              </Typography>
              <Typography variant="body2" sx={{ color: "#6c757d" }}>
                {event.hostInfo}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: 250,
              backgroundColor: "#bbdefb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
              mb: 2,
            }}
          >
            <img
              src={event.imageUrl}
              alt="Event"
              style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: 8 }}
            />
          </Box>
          <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
            {event.description}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "#6c757d" }}>
            <strong>Date:</strong> {event.eventDate}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "#6c757d" }}>
            <strong>Time:</strong> {event.eventTime}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "#6c757d" }}>
            <strong>Location:</strong> {event.eventLocation}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "#0d47a1" }}>
            <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
              Register Here
            </a>
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton sx={{ color: "#0d47a1" }} onClick={() => console.log(`Liked event: ${event.eventTitle}`)}>
              <FavoriteIcon />
            </IconButton>
            <IconButton sx={{ color: "#0d47a1" }} onClick={() => console.log(`Commented on event: ${event.eventTitle}`)}>
              <CommentIcon />
            </IconButton>
            <IconButton sx={{ color: "#0d47a1" }} onClick={() => console.log(`Shared event: ${event.eventTitle}`)}>
              <ShareIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default EventCard;
