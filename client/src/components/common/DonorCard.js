import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Email, Phone, LocationOn } from "@mui/icons-material";
import axios from "axios";
import { useSelector } from "react-redux";

const DonorCard = ({ donor }) => {
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  async function sendMailToDonor() {
    const formdata = new FormData();
    formdata.append("to", donor.user.email);
    formdata.append("firstName", donor.firstName);
    formdata.append("lastName", donor.lastName);
    formdata.append("hospitalName", profile.hospitalName);
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_SERVER_URL}/api/v1/user/${user.id}/send-mail`,
      data: formdata,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.data);
        alert("Email sent successfully");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to send email");
      });
  }
  return (
    <Card sx={{ width: 450, margin: "20px auto" }}>
      <CardHeader
        avatar={
          <Avatar
            src={donor.avatar_url}
            alt={`${donor.firstName} ${donor.lastName}`}
          />
        }
        title={`${donor.firstName} ${donor.lastName}`}
        subheader={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocationOn fontSize="small" color="action" />
            <Typography variant="body2" color="textSecondary">
              {donor.address.address}, {donor.address.city},{" "}
              {donor.address.district}
            </Typography>
          </Box>
        }
      />
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Phone fontSize="small" color="action" />
          <Typography variant="body2" color="textSecondary">
            {donor.phoneNo}
          </Typography>
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Email />}
          onClick={sendMailToDonor}
        >
          Send Email
        </Button>
      </CardActions>
    </Card>
  );
};

export default DonorCard;
